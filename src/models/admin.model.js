import { UserModel } from './user.model';
import { Schema } from 'mongoose';
const options = { discriminatorKey: 'kind' };

const adminSchema = new Schema({}, options);

export const AdminModel = UserModel.discriminator('Admin', adminSchema);
