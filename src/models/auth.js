import mongoose from 'mongoose';
import { RoleModel } from './role.model';
import { UserModel } from './user.model';
import { MemberModel } from './member.model';

mongoose.Promise = global.Promise;

const auth = {};

auth.mongoose = mongoose;

auth.user = UserModel;
auth.member = MemberModel;
auth.role = RoleModel;

auth.ROLES = ['Admin', 'Teacher', 'Chairman', 'Member', 'Collaborator'];

export default auth;
