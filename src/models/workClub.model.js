import { model, Schema, Types } from 'mongoose';

const WorkClubSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		clubWorks: [
			{
				clubId: {
					type: Types.ObjectId,
					ref: 'Club',
				},
				content: {
					type: String,
				},
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

export const WorkClubModel = model('WorkClub', WorkClubSchema);
