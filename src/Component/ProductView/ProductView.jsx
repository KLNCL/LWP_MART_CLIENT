import React from 'react'
import "./ProductView.scss"
import { IoMdCloseCircle } from "react-icons/io";
import productImage from "../../Image/card-2.jpg";
import profileImage from '../../Image/Profile.jpg'

export default function ProductView(props) {
    return (
        <div className="product_view-container">
            <div className="card">
                <div className="top">
                    <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
                        <IoMdCloseCircle onClick={() => props.closeProductViewPopupWindow()} size={28} color='red' style={{ paddingRight: "5px", marginTop: "5px", cursor: "pointer" }} />
                    </div>
                </div>
                <div className="body">
                    <div className="left">
                        <div className="image">
                            <img src={productImage} />
                        </div>
                        <div className="seller-detail">
                            <img src={profileImage} />
                            <p>Seller Name</p>
                        </div>
                    </div>
                    <div className="right">
                        <div className="product-details">
                            <h3>Product Name:</h3>
                            <p>Wood Furniture</p>
                        </div>
                        <div className="product-details">
                            <h3>Price:</h3>
                            <p>Rs. 10000.00</p>
                        </div>
                        <div className="product-details">
                            <h3>Qty:</h3>
                            <p>15</p>
                        </div>
                        <div className="product-details">
                            <h3>Description:</h3>
                            <p>Wood furniture offers warmth, durability, and natural charm, with unique grains and finishes that enhance both casual and formal spaces beautifully.</p>
                        </div>
                        <div className="product-details">
                            <h3>Mobile No:</h3>
                            <p>071-52698745</p>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginTop: "5px", marginBottom: "20px" }}>
                       <a href='/purchase'>
                       <button style={{ marginRight: "20px" }}>Oder Now</button>
                       </a>
                    </div>
                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginTop: "5px", marginBottom: "20px" }}>
                        <button style={{ marginRight: "20px" }}>Add Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
