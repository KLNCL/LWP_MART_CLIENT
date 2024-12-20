import React from 'react'
import "./Registration.scss"

export default function Registration() {
  return (
    <div className='registrtion-container'>
        <div className='header'>
          <h1>LWP MART</h1>
        </div>
        <div className="signup">
          <div className="gray-box">
              <div className='form'>
                <input type='text' placeholder='User Name'/>
                <input type='text' placeholder='Password'/>
                <input type='text' placeholder='Re-enter Password'/>
                <button class="Signup-button" type="submit">SIGN UP</button>
                </div>

                <div class="link">
                    <p>If you dont have an account <a href="/login"> <b style={{color:"white"}}>login</b></a> </p>
                </div>
          </div>
        </div>
    </div>
  )
}

