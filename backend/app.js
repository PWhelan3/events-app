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