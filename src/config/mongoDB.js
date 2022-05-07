import mongoose from 'mongoose';
import { env } from '../config/environments';
import { ROLES_STATUS } from '../utillities/constants';
import auth from '../models/auth';
const Role = auth.role;

export const connectDB = async () => {
	const client = await mongoose.connect(env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log('Connect to mongo DB ... ');
};

export const initialDB = () => {
	Role.estimatedDocumentCount((err, count) => {
		if (!err && count === 0) {
			ROLES_STATUS.forEach((el) => {
				new Role({
					name: el.name,
					standOf: el.standOf,
				}).save((err) => {
					if (err) {
						console.log('error', err);
					}

					console.log(`added ${el.name} to roles collection`);
				});
			});
		}
	});
};
