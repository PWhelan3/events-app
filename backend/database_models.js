//user model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String },
  location: { type: String },
  interests: [{ type: String }]
});

module.exports = mongoose.model('User', userSchema);
