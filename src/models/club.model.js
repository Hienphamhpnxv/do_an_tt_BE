import { Schema, model, Types } from 'mongoose';

const ClubSchema = new Schema({
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
		required: true,
	},
	foundedTime: {
		type: Date,
		default: new Date(),
	},
});

export const ClubModel = model('Club', ClubSchema);
