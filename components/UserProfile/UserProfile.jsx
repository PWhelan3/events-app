import { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);

  return user ? (
    <div>
      <h1>{user.username}</h1>
      <p>{user.email}</p>
      <img src={user.profilePic} alt="Profile Pic" />
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default UserProfile;
