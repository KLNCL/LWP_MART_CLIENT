import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import "./Registration.scss"
import instance from '../../../utils/AxiosInstance'

export default function Registration() {

  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const userName = e.target['userName'].value;
    const email = e.target['email'].value;
    const password = e.target['password'].value;
    const confirmPassword = e.target['confirmPassword'].value;

    // Validate password and confirmation match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Prepare data payload
    const payload = { userName, email, password };

    try {
      const res = await instance.post('/createusers', payload);
      if (res.status === 200) {
        // alert("Registration successful!");
        setSuccess(true);
        navigate('/login');
      } else {
        // alert("Registration failed. Please try again.");
        setError(true);
      }
    } catch (error) {
      console.error("Error during registration:", error);
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
                <input type='text' name='userName' placeholder='User Name' required/>
                <input type='text' name='email' placeholder='email' required/>
                <input type='text' name='password' placeholder='Password' required/>
                <input type='text' name='confirmPassword' placeholder='Re-enter Password'/>
                <button class="Signup-button" type="submit" >SIGN UP</button>

                {success && (
                  <span style={{ color: 'green', display: 'block', marginTop: '10px' }}>
                    User registration successful! Redirecting...
                  </span>
                )}

                {error && (
                  <span style={{ color: 'red', display: 'block', marginTop: '10px' }}>
                    User registration fail! Please try again.
                  </span>
                )}

                </form>

                <div class="link">
                    <p>If you dont have an account <a href="/login"> <b style={{color:"white"}}>login</b></a> </p>
                </div>
          </div>
        </div>
    </div>
  )
}