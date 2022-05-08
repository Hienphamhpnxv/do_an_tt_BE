import { model, Schema, Types } from 'mongoose';

const WorkSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		memberWorks: [
			{
				type: Types.ObjectId,
				ref: 'Member',
			},
		],
		timeStart: {
			type: Date,
			default: Date.now,
		},
		timeEnd: {
			type: Date,
			default: Date.now,
		},
		description: {
			type: String,
		},
		status: {
			type: Number,
		},
	},
	{ timestamps: true }
);

export const WorkModel = model('Work', WorkSchema);
