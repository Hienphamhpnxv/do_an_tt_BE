import mongoose from 'mongoose';
import { env } from '../config/environments';
import { POSITION } from '../utillities/constants';
import { PositionModel } from '../models/position.model';
import auth from '../models/auth';
const Role = auth.role;
const ROLES = auth.ROLES;

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
			ROLES.forEach((el) => {
				new Role({
					name: el,
				}).save((err) => {
					if (err) {
						console.log('error', err);
					}

					console.log(`added ${el} to roles collection`);
				});
			});
		}
	});

	PositionModel.estimatedDocumentCount((err, count) => {
		if (!err && count === 0) {
			POSITION.forEach((el) => {
				const { name, standOf } = el;
				new PositionModel({
					name,
					standOf,
				}).save((err) => {
					if (err) {
						console.log('error', err);
					}

					console.log(`added ${name} to potision collection`);
				});
			});
		}
	});
};
