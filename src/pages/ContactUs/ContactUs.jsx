import React from 'react'
import "./ContactUs.scss"
import backgroundImage from "../../Image/ContactUs.jpg";
import { MdCall } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

export default function ContactUs() {
  return (
    <div className="contactUs-container">
        <div className="title">
        <p>Contact Us</p>
        <hr style={{ width: "85vw", color: "black", marginTop: "173px" }} />
        </div>
        <div className="body">
            <div className="img">
                <div className="left">
                    <h1 style={{marginBottom:"20px"}}>Contact Us</h1>
                    <div className="mobile-number">
                    
                        <h3><MdCall style={{marginRight:"15px"}}/>Mobile Number:</h3>
                        <p >0123456789</p>
                    </div>
                    <div className="whatsapp-number">
                        <h3><FaWhatsapp style={{marginRight:"15px"}} />Whatsapp Number:</h3>
                        <p>0123456789</p>
                    </div>
                    <div className="email">
                        <h3><MdOutlineEmail style={{marginRight:"15px"}}/>Email:</h3>
                        <p>lwpmart@gmail.com</p>
                    </div>
                </div>
                <div className="right">
                    <img src={backgroundImage}/>
                </div>
                
            </div>
            <div className="form">
                {/* <h1>Get In Touch</h1>
                <div className="name">
                    <p>Name</p>
                </div>
                <div className="email">
                    <p>Email Address</p>
                </div>
                <div className="number">
                    <p>Whatsapp Number</p>
                </div>
                <div className="message">
                    <p>Type your Message</p>
                </div> */}

            </div>
        </div>
    </div>
  )
}

