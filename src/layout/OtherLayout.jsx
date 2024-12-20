import React, { useState } from 'react'
import {Outlet} from 'react-router-dom'
import Nav from '../Component/Navigation/Navigation'

const OtherLayout = () => {
  const [backdrop, setBackdrop] = useState(false)
  return (
    <div style={{width: '100vw', height: '100vh', boxSizing: 'border-box', overflowX: 'hidden', overflowY: 'auto'}}>
      <div style={{position: 'absolute', zIndex: 10}}>
        <Nav setBackdrop={setBackdrop} />
      </div>
      {backdrop && <div
        style={{
          position:'absolute',
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.5)',
          top: 0,
          left: 0,
          zIndex: 1
        }}
      ></div>}
      <Outlet />      
    </div>
  )
}

export default OtherLayout