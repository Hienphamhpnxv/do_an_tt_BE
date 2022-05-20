import mongoose from 'mongoose';
import { STATUS_EXAM } from '../utillities/constants';

const Schema = mongoose.Schema;

const examSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'Chưa có tiêu đề bài kiểm tra'],
		},
		classroom: {
			type: Schema.Types.ObjectId,
			required: [true, 'Chưa chọn lớp học'],
			ref: 'Classroom',
		},
		statusExam: {
			type: Number,
			default: STATUS_EXAM.DOING,
		},
		description: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

export const ExamModel = mongoose.model('Exam', examSchema);
