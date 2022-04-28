import mongoose from "mongoose";
import { RoleModel } from "./role.model";
import { UserModel } from "./user.model";

mongoose.Promise = global.Promise;

const auth = {};

auth.mongoose = mongoose;

auth.user = UserModel;
auth.role = RoleModel;

auth.ROLES = ["user", "admin", "moderator"];

export default auth;