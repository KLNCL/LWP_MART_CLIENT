import React from 'react'
import './cart.scss';

export default function Cart() {
  return (
    <div className="cart-container">
        <div className="left">
        <div className="table-heder">
            <p>Cart</p>
        </div>
        <div className="table-body">
            <div className="image"></div>
            <div className="details">
                <div className="title"></div>
                <div className="price"></div>
            </div>
        </div>
        <div className="delete"></div>
        </div>

        <div className="right"></div>
        
    </div>
  )
}
