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
	club: {
		type: Types.ObjectId,
	},
	grade: {
		type: String,
	},
});

export const MemberModel = model('Member', memberSchema);
