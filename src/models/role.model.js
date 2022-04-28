const mongoose = require("mongoose");
const { Schema } = mongoose;

const roleSchema = new mongoose.Schema({
  name: String,
});

export const RoleModel = mongoose.model("Role", roleSchema);
