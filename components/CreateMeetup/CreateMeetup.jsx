import { useState } from 'react';

const CreateMeetup = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('spontaneous');
  const [date, setDate] = useState('');
  const [recurringPattern, setRecurringPattern] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const meetup = {
      title,
      description,
      location,
      type,
      date,
      recurringPattern: type === 'recurring' ? recurringPattern : null
    };

    await fetch('/api/meetups/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meetup),
    });

    alert('Meetup Created!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="spontaneous">Spontaneous</option>
        <option value="recurring">Recurring</option>
      </select>
      <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
      {type === 'recurring' && (
        <select value={recurringPattern} onChange={(e) => setRecurringPattern(e.target.value)}>
          <option value="">Select Recurring Pattern</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      )}
      <button type="submit">Create Meetup</button>
    </form>
  );
};

export default CreateMeetup;
