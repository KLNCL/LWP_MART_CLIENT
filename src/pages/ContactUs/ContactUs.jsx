import React, { useRef, useState } from 'react'
import "./ContactUs.scss"
import backgroundImage from "../../Image/ContactUs.jpg";
import { MdCall } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import emailJs from '@emailjs/browser'

const Result = () => {
    return (
        <p style={{ color: "blue", paddingLeft: '50px' }}>Your massage has been succsessfully sent. I will contact you soon.</p>
    )
}

export default function ContactUs() {

    const [result, showResult] = useState(false);
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailJs.sendForm('service_4uuiw2n', 'template_ptwvb0h', e.target, '5CVhUkK8oVbIPQ-D6')

        e.target.reset();
        showResult(true);
    };

    setTimeout(() => {
        showResult(false);
    }, 5000)

    return (
        <div className="contactUs-container">
            <div className="title">
                <p>Contact Us</p>
                <hr style={{ width: "85vw", color: "black", marginTop: "173px" }} />
            </div>
            <div className="body">
                <div className="img">
                    <div className="left">
                        <h1 style={{ marginBottom: "20px" }}>Contact Us</h1>
                        <div className="mobile-number">

                            <h3><MdCall style={{ marginRight: "15px" }} />Mobile Number:</h3>
                            <p >0123456789</p>
                        </div>
                        <div className="whatsapp-number">
                            <h3><FaWhatsapp style={{ marginRight: "15px" }} />Whatsapp Number:</h3>
                            <p>0123456789</p>
                        </div>
                        <div className="email">
                            <h3><MdOutlineEmail style={{ marginRight: "15px" }} />Email:</h3>
                            <p>lwpmart@gmail.com</p>
                        </div>
                    </div>
                    <div className="right">
                        <img src={backgroundImage} />
                    </div>

                </div>
                <div className='form-container'>
                    {/* <h1>Get In Touch</h1> */}
                    <form ref={form} onSubmit={sendEmail}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            <label>Name</label>
                            <input type='text' name='name' />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            <label>Email Address</label>
                            <input type='text' name='email' />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            <label>Subject</label>
                            <input type='text' />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            <label>Contact Number</label>
                            <input type='text' name='contactNumber' />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            <label >Type Your Message</label>
                            <input type='text' name='message' />
                        </div>
                        <div></div>
                        <button>Send message</button>
                        <div>{result ? <Result /> : null}</div>
                    </form>
                   
                </div>

            </div>
        </div>
    )
}

