import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Registration.scss";
import instance from '../../../utils/AxiosInstance';

export default function Registration() {

  const navigate = useNavigate();
  const [errors, setError] = useState('');
  const [success, setSuccess] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    const userName = e.target['userName'].value;
    const email = e.target['email'].value;
    const password = e.target['password'].value;
    const confirmPassword = e.target['confirmPassword'].value;

    // Validate password and confirmation match
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Prepare data payload
    const payload = { userName, email, password };

    try {
      const res = await instance.post('/createusers', payload);
      if (res.status === 200) {
        setSuccess("User registration successful! Redirecting...");
        setError('');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Something went wrong';
      console.error("Error during registration:", error);
      setError(errorMsg);
    }
  };

  return (
    <div className='registrtion-container'>
      <div className='header'>
        <h1>LWP MART</h1>
      </div>
      <div className="signup">
        <div className="gray-box">
          <form onSubmit={submit}>
            <input type='text' name='userName' placeholder='User Name' required />
            <input type='email' name='email' placeholder='Email' required />
            <input type='password' name='password' placeholder='Password' required />
            <input type='password' name='confirmPassword' placeholder='Re-enter Password' required />
            <button className="Signup-button" type="submit">SIGN UP</button>

            {success && (
              <span style={{ color: 'green', display: 'block', marginTop: '10px' }}>
                {success}
              </span>
            )}

            {errors && (
              <span style={{ color: 'red', display: 'block', marginTop: '10px' }}>
                {errors}
              </span>
            )}

          </form>

          <div className="link">
            <p>If you don't have an account <a href="/login"><b style={{ color: "white" }}>login</b></a> </p>
          </div>
        </div>
      </div>
    </div>
  );
}