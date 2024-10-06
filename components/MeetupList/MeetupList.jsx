import { useEffect, useState } from 'react';

const MeetupList = ({ location }) => {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    const fetchMeetups = async () => {
      const response = await fetch(`/api/meetups/nearby?location=${location}`);
      const data = await response.json();
      setMeetups(data);
    };
    
    if (location) {
      fetchMeetups();
    }
  }, [location]);

  return (
    <div>
      <h2>Nearby Meetups</h2>
      {meetups.map((meetup) => (
        <div key={meetup._id}>
          <h3>{meetup.title}</h3>
          <p>{meetup.description}</p>
          <p>Location: {meetup.location}</p>
          <p>Date: {new Date(meetup.date).toLocaleString()}</p>
          {meetup.recurringPattern && <p>Recurring: {meetup.recurringPattern}</p>}
        </div>
      ))}
    </div>
  );
};

export default MeetupList;
