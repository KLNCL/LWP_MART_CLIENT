import React from 'react'
import "./Login.scss"


export default function Login() {
    return (
        <div className="login-container">
            <div className="heder">
                <h1>LWP MART</h1>
            </div>
            <div className="login">
                <div className="gray-box">
                <div className='form'>
                <input type='text' placeholder='User Name'/>
                <input type='text' placeholder='Password'/>
                <button class="LogIn-button" type="submit">Log In</button>
              </div>
              <div class="link">
                    <p>If you dont have an account <a href="/registration"> <b style={{color:"white"}}>Sign Up</b></a> </p>
                    <p>Forget Password</p>
                </div>
                </div>
            </div>
        </div>
    )
}
