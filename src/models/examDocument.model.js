import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const examDocumentSchema = new Schema(
	{
		title: {
			type: String,
		},
		exam: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Exam',
		},
		url: {
			type: String,
		},
		type: {
			type: String,
		},
		author: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

export const ExamDocumentModel = mongoose.model('ExamDocument', examDocumentSchema);
