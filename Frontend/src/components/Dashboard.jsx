import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('/api/wallet', {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        setUser(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}</p>
      <p>Wallet 1: {user.wallet1}</p>
      <p>Wallet 2: {user.wallet2}</p>
    </div>
  );
};

export default Dashboard;
