import { Types } from 'mongoose';
import { WorkClubModel } from '../models/workClub.model';
import { httpStatusCode } from '../utillities/constants';
const createWork = async (req, res) => {
	const data = req.body;
	const work = new WorkClubModel({ ...data });
	work
		.save()
		.then((savedDoc) => {
			res.send({ ...savedDoc });
		})
		.catch((err) => {
			res.send(false);
		});
};

const getWorks = async (req, res) => {
	const data = await WorkClubModel.aggregate([
		{
			$lookup: {
				from: 'clubs',
				localField: 'clubWorks.clubId',
				foreignField: '_id',
				as: 'clubInfo',
			},
		},
	]);
	res.send([...data]);
};

const updateWork = async (req, res) => {
	try {
		const data = req.body;
		const { id } = req.params;
		const result = await WorkClubModel.findByIdAndUpdate(id, data, {
			returnOriginal: false,
		});
		res.status(httpStatusCode.OK).json({ ...result });
	} catch (error) {
		res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: new Error(error).message });
	}
};

const deleteWorkById = async (req, res) => {
	const { id } = req.params;
	try {
		WorkClubModel.findByIdAndDelete(id, async (err, docs) => {
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

export const workClubController = { getWorks, createWork, deleteWorkById, updateWork };
