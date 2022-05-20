import { Types } from 'mongoose';
import { ExamModel } from '../models/exam.model';
import { ExamDocumentModel } from '../models/examDocument.model';
import { httpStatusCode, STATUS_EXAM } from '../utillities/constants';

const createExam = async (req, res) => {
	try {
		const examData = req.body.exam;
		const exam = new ExamModel({ ...examData });
		const examDocumentData = req.body.examDocument;
		await exam.save().catch((err) => {
			throw new Error(err);
		});
		examDocumentData.forEach(async (el) => {
			const examDocument = new ExamDocumentModel({ exam: exam._id, ...el });
			await examDocument.save().catch((err) => {
				throw new Error(err);
			});
		});
		res.status(httpStatusCode.OK).json({ ...exam._doc, examDocument: examDocumentData });
	} catch (error) {
		res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
	}
};

const updateExam = async (req, res) => {
	try {
		const { id } = req.params;
		const examData = req.body.exam;
		const examDocumentData = req.body.examDocument;

		const exam = await ExamModel.findByIdAndUpdate(id, examData).catch((err) => {
			throw new Error(err);
		});
		examDocumentData.forEach(async (el) => {
			if (!el.exam) {
				const examDocument = new ExamDocumentModel({ exam: exam._id, ...el });
				await examDocument.save().catch((err) => {
					throw new Error(err);
				});
			}
		});
		res.status(httpStatusCode.OK).json({ result: { ...examData, examDocument: examDocumentData } });
	} catch (error) {
		res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: new Error(error).message });
	}
};

const deleteExamById = async (req, res) => {
	const { id } = req.params;
	try {
		// Delete exam
		ExamModel.findByIdAndDelete(id, (err, docs) => {
			if (err) {
				throw new Error(err);
			}
		});

		// Delete document of exam
		ExamDocumentModel.deleteMany(
			{
				exam: {
					$in: id,
				},
			},
			(err, docs) => {
				if (err) {
					throw new Error(err);
				}
			}
		);

		res.status(200).json({ result: true });
	} catch (error) {
		res.status(404).json({
			result: false,
		});
	}
};

const getAllExamsDoing = async (req, res) => {
	const { classroomId } = req.params;
	ExamModel.find({
		classroom: classroomId,
		statusExam: STATUS_EXAM.DOING,
	}).exec((err, exams) => {
		if (err) {
			res.status(500).send({ message: err });
		}

		res.status(200).json({ result: exams });
	});
};

const getAllExams = async (req, res) => {
	try {
		const { classroomId } = req.params;

		let data = await ExamModel.aggregate([
			{
				$lookup: {
					from: 'examdocuments',
					localField: '_id',
					foreignField: 'exam',
					as: 'examDocument',
				},
			},
		]);
		if (data.length && classroomId) {
			data = data.filter((el) => el.classroom.equals(Types.ObjectId(classroomId)));
		}
		res.status(httpStatusCode.OK).json({ result: data });
	} catch (error) {
		res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
	}
};

export const examController = { createExam, updateExam, deleteExamById, getAllExamsDoing, getAllExams };
