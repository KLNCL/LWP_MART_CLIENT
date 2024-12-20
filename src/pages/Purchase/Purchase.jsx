import React from 'react'
import "./purchase.scss"
import productImage from "../../Image/card-2.jpg";


export default function Purchase() {
    return (
        <div className="purchase-container">
            <div className="top">
                <p>Purchase</p>
                <hr style={{width:"85vw", color:"black", marginTop:"173px"}}/>
            </div>
            <div className="body">
                <div className="left">
                    <div className="image">
                        <img src={productImage} />
                    </div>
                </div>
                <div className="right">
                    <div className='input-filed'>
                        <span style={{ marginBottom: "50px", fontSize: "17px", color:"black" }}>Name:</span>
                        <input type='text' />
                    </div>
                    <div className="input-filed">
                        <span style={{ marginBottom: "5px", fontSize: "17px", color:"black" }}>Address:</span>
                        <input type='text' />
                    </div>
                    <div className="input-filed">
                        <span style={{ marginBottom: "5px", fontSize: "17px", color:"black" }}>Contact No:</span>
                        <input type='text' />
                    </div>
                    <div className="input-filed">
                        <span style={{ marginBottom: "5px", fontSize: "17px", color:"black" }}>QTY:</span>
                        <input type='text' />
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "5px", marginBottom: "20px", marginLeft:"500px" }}>
                    <button style={{ marginRight: "20px" }}>ORDER</button>
                </div>
            </div>
        </div>
    )
}
