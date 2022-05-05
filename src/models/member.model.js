import { Schema, model, Types } from 'mongoose';

const memberSchema = new Schema({
	studentCode: {
		type: String,
		required: true,
	},
	classname: {
		type: String,
		required: true,
	},
	activityBoard: {
		type: Types.ObjectId,
	},
	positions: [
		{
			type: Types.ObjectId,
			ref: 'Position',
		},
	],
});

export const MemberModel = model('Member', memberSchema);
