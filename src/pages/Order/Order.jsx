import React, { useState } from 'react';
import './order.scss';
import productImage from "../../Image/card-2.jpg";

export default function Order() {
  const [toggleStates, setToggleStates] = useState({});

  const cardDetails = [
    { id: '0001', name: 'Wood mask', qty: 2, price: 10000.0, customerName:'Imeshika Madhubashini', address:'No 52, Dambulla Rd, Habarana', contactNo: "071-5632987", image: productImage },
    { id: '0002', name: 'Stone sculpture', qty: 1, price: 15000.0, customerName:'Imeshika Madhubashini', address:'No 52, Dambulla Rd, Habarana',contactNo: "071-5632987",  image: productImage },
    { id: '0003', name: 'Stone sculpture', qty: 1, price: 15000.0, customerName:'Imeshika Madhubashini', address:'No 52, Dambulla Rd, Habarana',contactNo: "071-5632987",  image: productImage },
    { id: '0004', name: 'Stone sculpture', qty: 1, price: 15000.0, customerName:'Imeshika Madhubashini', address:'No 52, Dambulla Rd, Habarana',contactNo: "071-5632987",  image: productImage },
    { id: '0005', name: 'Stone sculpture', qty: 1, price: 15000.0, customerName:'Imeshika Madhubashini', address:'No 52, Dambulla Rd, Habarana',contactNo: "071-5632987",  image: productImage },
    { id: '0006', name: 'Stone sculpture', qty: 1, price: 15000.0, customerName:'Imeshika Madhubashini', address:'No 52, Dambulla Rd, Habarana',contactNo: "071-5632987",  image: productImage },
    { id: '0007', name: 'Stone sculpture', qty: 1, price: 15000.0, customerName:'Imeshika Madhubashini', address:'No 52, Dambulla Rd, Habarana',contactNo: "071-5632987",  image: productImage },
  ];


  const handleToggle = (cardId) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [cardId]: !prevState[cardId],
    }));
  };

  return (
    <div className="order-container">
      <div className="title">
        <p>ORDER</p>
        <hr style={{width:"95vw", color:"black"}}/>
      </div>
      <div className="body">
        <div
          className="table-heder"
          style={{
            fontWeight: 'bold',
            fontSize: '23px',
            backgroundColor: 'rgb(221, 221, 221)',
            color: 'black',
            marginTop:"30px"
          }}
        >
          <div className="id" style={{ height: '50px', width:"100px" }}>
            <p>ID</p>
          </div>
          <div className="image" style={{ height: '50px' }}>
            <p>Image</p>
          </div>
          <div className="item-name" style={{ height: '50px', width:"190px" }}>
            <p>Item Name</p>
          </div>
          <div className="qty" style={{ height: '50px', width:"100px" }}>
            <p>QTY</p>
          </div>
          <div className="price" style={{ height: '50px' }}>
            <p>Price</p>
          </div>
          <div className="cous-name" style={{ height: '50px', width:"250px" }}>
            <p>Customer Name</p>
          </div>
          <div className="address" style={{ height: '50px', width:"300px" }}>
            <p>address</p>
          </div>
          <div className="contactNo" style={{ height: '50px', width:"200px" }}>
            <p>Contact No</p>
          </div>
          
          <div className="see-more" style={{ height: '50px', width:"85px" }}></div>
        </div>

        <div
          className="table-body"
          style={{
            marginTop: '8px',
            width: '65vw',
            borderRadius: '6px',
            flexDirection: 'column',
          }}
        >
          {cardDetails.map((card) => (
            <div
              key={card.id}
              className="detail-card"
              style={{
                display: 'flex',
                // backgroundColor: 'gray',
                height: '90px',
                marginBottom: '4px',
              }}
            >
              <div className="id" style={{width:"100px" }}>
                <p>{card.id}</p>
              </div>
              <div className="image">
                <img
                  src={card.image}
                  alt={card.name}
                  style={{
                    width: '100px',
                    height: '80px',
                    borderRadius: '12px',
                  }}
                />
              </div>
              <div className="item-name" style={{width:"190px"}}>
                <p>{card.name}</p>
              </div>
              <div className="qty" style={{width:"100px"}}>
                <p>{card.qty}</p>
              </div>
              <div className="price">
                <p>{card.price.toFixed(2)}</p>
              </div>
              <div className="cous-name" style={{width:"250px"}}>
                <p>{card.customerName}</p>
              </div>
              <div className="address" style={{width:"300px"}}>
                <p>{card.address}</p>
              </div>
              <div className="contactNo" style={{width:"200px"}}>
                <p>{card.contactNo}</p>
              </div>
              <div className="see-more" style={{ flexDirection: 'column', alignItems: 'center', width:"85px" }}>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={!!toggleStates[card.id]}
                    onChange={() => handleToggle(card.id)}
                  />
                  <span className="slider"></span>
                </label>
                {/* <p style={{ padding: '6px' }}>See more</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
