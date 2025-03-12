import React, { useEffect, useState } from 'react';
import './order.scss';
import { jwtDecode } from "jwt-decode";
import instance from "../../utils/AxiosInstance";

export default function Order() {
  const [toggleStates, setToggleStates] = useState({});
  const [card, setCard] = useState('');
  const [productData, setProductData] = useState("");
  const [productId, setProductId] = useState(null);
  const [userId, setUserId] = useState(null);

    // Get user ID from the token
    const getUserDetailsFromToken = () => {
      const token = localStorage.getItem("authToken");
      if (!token) return null;

      try {
        return jwtDecode(token);
      } catch (error) {
        console.error("Invalid token", error);
        return null;
      }
    };

    const userDetails = getUserDetailsFromToken();
    const seller_id = userDetails?._id;

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await instance.get(`/orders/${seller_id}`);
        if (res.data) {
          setCard(res.data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    getOrder();
  }, [seller_id]);

  useEffect(() => {
    if (card && card.length > 0) {
      setProductId(card[0].product_id);
    }
  }, [card]);

  useEffect(() => {

    const getProduct = async () => {
      try {
        const res = await instance.get(`/products/${productId}`);
        if (res.data) {
          setProductData(res.data);
        }
      } catch (err) {
        console.error("Error fetching product data:", err);
      }
    };

    getProduct();
  },[productId]);

  const handleToggle = (index) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

console.log(card);

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
          {card && card.map((card, index) => (
            <div
              key={card.index}
              className="detail-card"
              style={{
                display: 'flex',
                // backgroundColor: 'gray',
                height: '90px',
                marginBottom: '4px',
              }}
            >
              <div className="id" style={{width:"100px" }}>
                <p>{index + 1}</p>
              </div>
              <div className="image">
                <img
                  src={`http://localhost:5000/api/image/${card.image}`}
                  alt={card.name}
                  style={{
                    width: '100px',
                    height: '80px',
                    borderRadius: '12px',
                  }}
                />
              </div>
              <div className="item-name" style={{width:"190px"}}>
                <p>{productData.productName}</p>
              </div>
              <div className="qty" style={{width:"100px"}}>
                <p>{card.orderqty}</p>
              </div>
              <div className="price">
                <p>{card.orderqty && productData.price ? (card.orderqty * productData.price).toFixed(2) : "Loading..."}</p>
              </div>
              <div className="cous-name" style={{width:"250px"}}>
                <p>{card.buyerName}</p>
              </div>
              <div className="address" style={{width:"300px"}}>
                <p>{card.address}</p>
              </div>
              <div className="contactNo" style={{width:"200px"}}>
                <p>{card.contact}</p>
              </div>
              <div className="see-more" style={{ flexDirection: 'column', alignItems: 'center', width:"85px" }}>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={!!toggleStates[index]}
                    onChange={() => handleToggle(index)}
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