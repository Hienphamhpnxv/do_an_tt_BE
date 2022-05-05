const mongoose = require('mongoose');

const postionSchema = new mongoose.Schema({
	name: String,
	standOf: String,
});

export const PositionModel = mongoose.model('Position', postionSchema);
