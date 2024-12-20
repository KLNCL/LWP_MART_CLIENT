import React from 'react'
import './Navigation.scss'
import { FaBars, FaTimes, FaCartPlus } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'

export default function Navigation() {
  return (
    <div className='navigation-container'>
      <nav>
        <input type="checkbox" id='check' className='check'/>
        <label htmlFor='check'>
          <FaBars className='btn'/>
          <FaTimes className='cancel'/>
        </label>
        <div className='name'>
          <h1>LWP MART</h1>
        </div>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#Message">Message</a></li>
          <li><a href="#Contact Us">Contact Us</a></li>
          <li><a href="/aboutUs">About</a></li>
          <a href="/profile" style={{marginRight:"30px", marginLeft:"10px", color:"white"}}><CgProfile size={25} /></a>
          <a href="/cart" style={{marginRight:"30px", color:"white"}}><FaCartPlus size={25} /></a>
        </ul>
      </nav>
    </div>
  )
}
