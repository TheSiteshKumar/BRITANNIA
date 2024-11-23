import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    referredBy: ''
  });

  const { name, email, password, referredBy } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const newUser = { name, email, password, referredBy };

    try {
      const res = await axios.post('/api/auth/register', newUser);
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" required />
        <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
        <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
        <input type="text" name="referredBy" value={referredBy} onChange={onChange} placeholder="Referral Code" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
