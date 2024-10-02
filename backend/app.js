const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.listen(5000, () => console.log('Server running on port 5000'));


const meetupRoutes = require('./routes/meetupRoutes');
app.use('/api/meetups', meetupRoutes);
