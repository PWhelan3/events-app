const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.listen(5000, () => console.log('Server running on port 5000'));


const meetupRoutes = require('./routes/meetupRoutes');
app.use('/api/meetups', meetupRoutes);



const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('createMeetup', (meetup) => {
    socket.broadcast.emit('newMeetup', meetup);
  });
});

http.listen(5000, () => console.log('Server running on port 5000'));
``


const cron = require('node-cron');

const createRecurringEvents = () => {
  cron.schedule('0 0 * * *', async () => { // Runs once daily
    const recurringMeetups = await Meetup.find({ type: 'recurring' });

    recurringMeetups.forEach(async (meetup) => {
      const now = new Date();
      if (new Date(meetup.date) < now) {
        let newDate;
        if (meetup.recurringPattern === 'daily') {
          newDate = new Date(now.setDate(now.getDate() + 1));
        } else if (meetup.recurringPattern === 'weekly') {
          newDate = new Date(now.setDate(now.getDate() + 7));
        } else if (meetup.recurringPattern === 'monthly') {
          newDate = new Date(now.setMonth(now.getMonth() + 1));
        }

        const newMeetup = new Meetup({
          ...meetup._doc,
          date: newDate,
        });

        await newMeetup.save();
      }
    });
  });
};

createRecurringEvents();
