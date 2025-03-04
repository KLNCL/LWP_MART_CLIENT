import React from 'react'
import "./Cart.scss"
import cardImage from "../../Image/card-2.jpg";
import { IoCloseOutline } from "react-icons/io5";


export default function Cart() {
  return (
    <div className="cart-continer">
      <div className="heder">
        <h1>Shopping Cart</h1>
      </div>
      <div className="item">
        <div className="left">
          <div className="table-heder" style={{fontWeight: 'bold',fontSize: '23px',backgroundColor: 'rgba(74, 74, 74, 0.912)',color: 'black' }}>
            <div className="continue-shopping">
              <p>Continue Shopping</p>
            </div>
            <div className="empty-cart">
              <p>Empty Cart</p>
            </div>
          </div>
          <div className="table-body">
            <div className="card">
            <img  src={cardImage}
                   style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '12px',
                    padding:"20px"
                  }} />
                  <p>Wood Furniture</p>
                  <IoCloseOutline className='close-icon'/>

            </div>
            
          </div>
        </div>
        <div className="right">
          <div className="price-card">
            <h2 style={{marginBottom:"10px"}}>Your Cart Total</h2>
            <h1 style={{marginBottom:"10px"}}>US$ 26</h1>
            <h2 style={{marginBottom:"10px", color:"rgb(110, 180, 78)"}}>TOTAL SAVING $3</h2>
            
          </div>
        </div>
      </div>
    </div>
  )
}
