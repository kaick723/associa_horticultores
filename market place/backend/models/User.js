const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  cep: { type: String, required: true },
  address: { type: String, required: true },
  number: { type: String, required: true },
  resetToken: { type: String },
  resetExpires: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
