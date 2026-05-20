// models/Admin.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true } // senha em texto puro
});

// método para comparar senha (simples)
adminSchema.methods.isValidPassword = function(password) {
  return this.password === password;
};

module.exports = mongoose.model("Admin", adminSchema);
