import React, { useState, useEffect } from 'react'
import "./Profile.scss"
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import ItemAdd from '../../Component/ItemAdd/ItemAdd';
import profileImage from '../../Image/Profile.jpg'
import ItemEdit from '../../Component/ItemEdit/ItemEdit';
import BecomeSeller from '../../Component/BecomeSeller/BecomeSeller';


export default function Profile() {

    const navigate = useNavigate();

    useEffect(() => {
      checkLoginStatus();
    }, []);

    const checkLoginStatus = () => {
      const token = localStorage.getItem("authToken"); 
      if (!token) {
        navigate('/login');
      }
    };

  const card = [
    {Image:"/Item/card-1.jpg", title:"Wood Furniture"},
    {Image:"/Item/card.jpg", title:"Wood Furniture"},
    {Image:"/Item/card-3.jpg", title:"Wood Furniture"},
    {Image:"/Item/card-1.jpg", title:"Wood Furniture"},
    {Image:"/Item/card.jpg", title:"Wood Furniture"},
    {Image:"/Item/card-3.jpg", title:"Wood Furniture"},
    {Image:"/Item/card-1.jpg", title:"Wood Furniture"},
    {Image:"/Item/card.jpg", title:"Wood Furniture"},
    {Image:"/Item/card-3.jpg", title:"Wood Furniture"},
   
  ]

const [itemAddPopup, setItemAddPopup] = useState(false);
const [itemEditPopup, setItemEditPopup] = useState(false);
const [becomeSellerPopup, setBecomeSellerPopup] = useState(false);

const itemAddPopupWindow = () =>{
  setItemAddPopup(true)
}
const colseItemAddPopupWindow = () =>{
  setItemAddPopup(false)
}

const itemEdditPopupWindow = () =>{
  setItemEditPopup(true)
}
const closeItemEditPopupWindow = () =>{
  setItemEditPopup(false)
}

const becomeSellerPopupWindow = () =>{
  setBecomeSellerPopup(true)
}
const closeBecomeSellerPopupWindow = () =>{
  setBecomeSellerPopup(false)
}

const handleLogout = () => {
  localStorage.removeItem("authToken");
  navigate("/");
};



  return (
    <>
    {itemAddPopup && <ItemAdd colseItemAddPopupWindow={colseItemAddPopupWindow} />}
    {itemEditPopup && <ItemEdit closeItemEditPopupWindow={closeItemEditPopupWindow} />}
    {becomeSellerPopup && <BecomeSeller closeBecomeSellerPopupWindow={closeBecomeSellerPopupWindow}/>}
        <div className="profle-container">
        <div className="left">
          <div className="image">
            <img src={profileImage}/>
          </div>
          <div className="seller-details">
            <div className="name">Imeshika Madhubashini</div>
            <div className="username">Imeshika</div>
            <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh.</div>
            <div className="contac-detail">
            <p style={{ color: "blue", fontWeight: "bold", fontSize: "17px" }}>Contact Details</p>
            <div className="contact-email">
              <MdOutlineEmail size={22} />
              <p>Imeshika@gmail.com</p>
            </div>
            <div className="contact-email">
              <MdOutlineLocalPhone size={22} />
              <p>071-6598325</p>
            </div>
            </div>
          </div>
          <div className="buttons-section" >
            <button className="seller"  onClick={becomeSellerPopupWindow}>Become a seller</button>
            {/* <button className="seller">Edit</button> */}
            <button className="seller">My Order</button>
            <button className="logout" onClick={handleLogout}>Log Out</button>
          </div>
        </div>
        <div className="right">
          <div className="top">
            <a href='/order' style={{textDecoration:"none"}}>
            <p>ORDERS</p>
            </a>
            
            <div className="Add-card">
              <IoIosAdd className='add' onClick={itemAddPopupWindow}/>
            </div>
          </div>
          <div className="bottom">
          {card.map((item, index) => (
              <div key={index} className="card" onClick={itemEdditPopupWindow}>
                <img src={item.Image} alt={item.title}/>
                <p>{item.title}</p>
              </div>
            ))}
           </div>
        </div>
      </div>
    </>
  )
}


