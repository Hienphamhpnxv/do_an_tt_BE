import { ClassroomModel } from '../models/classroom.model';
import { DocumentModel } from '../models/document.model';
import { httpStatusCode, STATUS_ACTIVE_CLASSROOM } from '../utillities/constants';

const createDocument = async (req, res) => {
	try {
		const data = req.body;
		const id = data.classroom;
		const { isDocumentActive } = data;
		const classroomInfo = await ClassroomModel.findById(id);
		if (
			(classroomInfo.statusActive === STATUS_ACTIVE_CLASSROOM.ACTIVE && !isDocumentActive) ||
			(classroomInfo.statusActive === STATUS_ACTIVE_CLASSROOM.PENDING && isDocumentActive)
		) {
			const document = new DocumentModel({ ...data });
			document.save();
			res.status(200).json(document);
		} else {
			res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Not create' });
		}
	} catch (error) {
		res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: new Error(error).message });
	}
};

const deleteDocumentById = async (req, res) => {
	const { id } = req.params;
	try {
		DocumentModel.findByIdAndDelete(id, async (err, docs) => {
			if (err) {
				throw new Error(err);
			}
		});

		res.status(200).json({ result: true });
	} catch (error) {
		res.status(404).json({
			result: false,
		});
	}
};

const getAllDocumentByClassroomID = async (req, res) => {
	const { classroomId } = req.params;
	DocumentModel.find({
		classroom: classroomId,
		isDocumentActive: false,
	}).exec((err, documents) => {
		if (err) {
			res.status(500).send({ message: err });
		}

		res.status(200).json({ result: documents });
	});
};

const getAllDocumentActiveByClassroomID = async (req, res) => {
	const { classroomId } = req.params;
	DocumentModel.find({
		classroom: classroomId,
		isDocumentActive: true,
	}).exec((err, documents) => {
		if (err) {
			res.status(500).send({ message: err });
		}

		res.status(200).json({ result: documents });
	});
};

export const documentController = {
	createDocument,
	getAllDocumentByClassroomID,
	getAllDocumentActiveByClassroomID,
	deleteDocumentById,
};
