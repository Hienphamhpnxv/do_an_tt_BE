import { Schema, model, Types } from 'mongoose';

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
			// required: true,
		},
		founder: {
			type: Types.ObjectId,
			ref: 'UserID',
		},
		foundedTime: {
			type: Date,
			default: new Date(),
		},
	},
	{ timestamps: true }
);

export const ClubModel = model('Club', ClubSchema);
