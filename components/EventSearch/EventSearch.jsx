import { useState, useEffect } from 'react';

const EventSearch = () => {
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (location && category) {
      fetch(`/api/events?location=${location}&category=${category}`)
        .then(res => res.json())
        .then(data => setEvents(data));
    }
  }, [location, category]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="music">Music</option>
        <option value="sports">Sports</option>
        <option value="food">Food</option>
      </select>

      <div>
        {events.map(event => (
          <div key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default EventSearch;
