import React from 'react'
import "./BecomeSeller.scss"
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlinePhotoCamera } from "react-icons/md";

export default function BecomeSeller(props) {
  return (
    <div className="BecomeSeller-container">
      <div className="card">
        <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
          <IoMdCloseCircle onClick={() => props.closeBecomeSellerPopupWindow()} size={28} color='red' style={{ paddingRight: "5px", marginTop: "5px", cursor: "pointer" }} />
        </div>
        <div className="title">
          <h1 style={{ paddingBottom: "15px" }}>Welcome to LWP Mart</h1>
          <p>Please complete your profile to get start</p>
        </div>
        <div className="profile-picture">
          <p>select a profile picture</p>
          <div className="image" >
          <MdOutlinePhotoCamera size={35} style={{cursor: "pointer" }}/>
          </div>
        </div>
        <div className="body">
          <div className="input-filed">
            <span style={{ marginBottom: "5px" }}>Full Name:</span>
            <input type='text' placeholder='Full Name' />
          </div>
          <div className="input-filed">
            <span style={{ marginBottom:"5px"}}>Address:</span>
            <input type='text' placeholder='Address'/>
          </div>
          <div className="input-filed">
            <span style={{ marginBottom:"5px"}}>Contact No:</span>
            <input type='text'placeholder='contact No'/>
          </div>
          <div className="input-filed">
            <span style={{ marginBottom:"5px"}}>Email:</span>
            <input type='text'placeholder='Email'/>
          </div>
          <div  className="input-filed">
          <span>Description:</span>
            <textarea style={{width:"200px", borderRedius:"6px", backgroundColor:"rgba(210, 209, 209, 0.319" }} rows={4} placeholder='Description'/>
          </div>
        </div>

        <div style={{width:"100%", display:"flex", justifyContent:"flex-end",marginTop:"28px", marginBottom:"18px" }}>
          <button style={{marginRight:"20px"}}>Become a seller</button>
          </div>
      </div>
    </div>
  )
}
