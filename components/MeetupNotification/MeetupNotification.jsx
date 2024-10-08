import io from 'socket.io-client';
import { useEffect } from 'react';

const socket = io('http://localhost:5000');

const MeetupNotification = () => {
  useEffect(() => {
    socket.on('newMeetup', (meetup) => {
      alert(`New spontaneous meetup created: ${meetup.title} at ${meetup.location}`);
    });
  }, []);

  return null; // No need to render anything for this component
};

export default MeetupNotification;
