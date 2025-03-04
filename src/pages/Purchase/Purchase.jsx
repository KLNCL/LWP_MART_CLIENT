import React, { useState } from 'react';
import "./purchase.scss";
import productImage from "../../Image/card-2.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import instance from '../../utils/AxiosInstance';

export default function Purchase() {
  const location = useLocation();
  const { orderDetails } = location.state || {};
  const navigate = useNavigate();

  // Redirect if orderDetails is missing
  if (!orderDetails) {
    alert("Order details are missing. Redirecting back...");
    navigate(-1); // Go back to the previous page
    return null; // Render nothing
  }

  // State for form inputs
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [qty, setQty] = useState("");

  // Handle form submission
  const handleOrder = async () => {
    try {
      // Prepare the payload
      const payload = {
        user_id: orderDetails.user_id, // Use orderDetails.user_id
        seller_id: orderDetails.seller_id, // Use orderDetails.seller_id
        product_id: orderDetails.product_id, // Use orderDetails.product_id
        buyerName: name,
        address: address,
        orderqty: qty,
        contact: contactNo,
        image: orderDetails.image || "default_image_url", // Use orderDetails.image or a fallback
      };

      // Call the API
      const response = await instance.post('/createorder', payload);

      // Handle success
      if (response.status === 200) {
        alert("Order created successfully!");
      } else {
        alert("Failed to create order.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("An error occurred while creating the order.");
    }
  };

  return (
    <div className="purchase-container">
      <div className="top">
        <p>Purchase</p>
        <hr style={{ width: "85vw", color: "black", marginTop: "173px" }} />
      </div>
      <div className="body">
        <div className="left">
          <div className="image">
            <img src={productImage} alt="Product" />
          </div>
        </div>
        <div className="right">
          <div className='input-filed'>
            <span style={{ marginBottom: "50px", fontSize: "17px", color: "black" }}>Name:</span>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-filed">
            <span style={{ marginBottom: "5px", fontSize: "17px", color: "black" }}>Address:</span>
            <input
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="input-filed">
            <span style={{ marginBottom: "5px", fontSize: "17px", color: "black" }}>Contact No:</span>
            <input
              type='text'
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
            />
          </div>
          <div className="input-filed">
            <span style={{ marginBottom: "5px", fontSize: "17px", color: "black" }}>QTY:</span>
            <input
              type='text'
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="bottom">
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "5px", marginBottom: "20px", marginLeft: "500px" }}>
          <button style={{ marginRight: "20px" }} onClick={handleOrder}>ORDER</button>
        </div>
      </div>
    </div>
  );
}