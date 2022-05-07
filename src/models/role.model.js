const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
	name: String,
	standOf: String,
});

export const RoleModel = mongoose.model('Role', roleSchema);
