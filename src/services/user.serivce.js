import { UserModel } from '../models/user.model';
import mongoose from 'mongoose';

const updateUser = async (id, data) => {
	try {
		const result = await UserModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, data, {
			returnOriginal: false,
		}).populate({ path: 'roles', select: '-__v' });
		return result;
	} catch (error) {
		throw new Error(error);
	}
};

export const userService = { updateUser };
