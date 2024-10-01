// routes/meetupRoutes.js
const express = require('express');
const router = express.Router();
const Meetup = require('../models/Meetup');

// Create a new meetup
router.post('/create', async (req, res) => {
  const { title, description, location, type, date, recurringPattern, creator } = req.body;

  try {
    const newMeetup = new Meetup({
      title,
      description,
      location,
      type,
      date,
      recurringPattern: type === 'recurring' ? recurringPattern : null,
      creator,
    });
    
    await newMeetup.save();
    res.status(201).json(newMeetup);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create meetup' });
  }
});

module.exports = router;
