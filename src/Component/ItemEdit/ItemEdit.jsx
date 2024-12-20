import React from 'react'
import "./ItemEdit.scss"
import { IoMdCloseCircle } from "react-icons/io";

export default function ItemEdit(props) {
  return (
    <div className="item_edit-container">
      <div className="card">
      <div style={{display:"flex", width:"100%",justifyContent:"flex-end"}}>
      <IoMdCloseCircle onClick={()=>props.closeItemEditPopupWindow()} size={28} color='red' style={{paddingRight:"5px", marginTop:"5px",cursor:"pointer"}}/>
      </div>
        <div className="title">
          <p style={{paddingBottom:"15px"}}>Item Update</p>
        </div>

        <div className="body">
          <div className='input-filed'>
            <span style={{marginBottom:"5px"}}>Product Name:</span>
            <input type='text' />
          </div>
          <div className="input-filed">
          <span>Quantity:</span>
          <input type='text'/>
          </div>
          <div className="input-filed">
          <span>Unit Price:</span>
          <input type='text'/>
          </div>
          <div className="input-filed">
          <span>Add Image:</span>
          <input type='file' />
          </div>
          <div  className="input-filed">
          <span>Description:</span>
            <textarea style={{width:"200px"}} rows={4}/>
          </div>
          </div>
         <div className='updating'>
         <div style={{width:"100%", display:"flex", justifyContent:"flex-end",marginTop:"5px", marginBottom:"20px" }}>
          <button style={{marginRight:"20px"}}>Edit</button>
          </div>
          <div style={{width:"100%", display:"flex", justifyContent:"flex-end",marginTop:"5px", marginBottom:"20px" }}>
          <button style={{marginRight:"20px"}}>Delete</button>
          </div>
          
         </div>
      </div>
    </div>
  )
}
