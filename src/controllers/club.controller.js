import { model } from 'mongoose';
import { ClubModel } from '../models/club.model';

const createClub = (req, res) => {
	const data = req.body;
	try {
		ClubModel.findOne(
			{
				name: { $in: data.name },
			},
			(err, club) => {
				if (err) {
					throw new Error(err);
				}

				if (!club) {
					const club = new ClubModel({ ...data });
					club.save((err) => {
						if (err) {
							throw new Error(err);
						}

						res.status(200).json({ message: 'Club was registered successfully!' });
					});
				} else {
					res.status(303).json({
						message: 'Club exists',
					});
				}
			}
		);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const getClubs = async (req, res) => {
	const clubs = await ClubModel.find({});
	res.send([...clubs]);
};

export const clubController = {
	createClub,
	getClubs,
};
