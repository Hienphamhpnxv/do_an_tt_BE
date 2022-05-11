import { Schema, model, Types } from 'mongoose';
import { HAS_CLASSROOM } from '../utillities/constants';

const ClubSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		standOfName: {
			type: String,
			required: true,
		},
		logo: {
			type: String,
		},
		description: {
			type: String,
		},
		foundedTime: {
			type: Date,
			default: new Date(),
		},
		hasClassroom: {
			type: Number,
			default: HAS_CLASSROOM.NO,
			required: false,
		},
	},
	{ timestamps: true }
);

export const ClubModel = model('Club', ClubSchema);
