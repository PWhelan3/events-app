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



//Event model
const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'Host' },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Event', eventSchema);



//Host model
const hostSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
});

module.exports = mongoose.model('Host', hostSchema);



//Create User
app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'User creation failed' });
  }
});
