import React, { useState, useEffect } from "react";
import "./Profile.scss";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import ItemAdd from "../../Component/ItemAdd/ItemAdd";
import profileImage from "../../Image/Profile.jpg";
import ItemEdit from "../../Component/ItemEdit/ItemEdit";
import { jwtDecode } from "jwt-decode";
import BecomeSeller from "../../Component/BecomeSeller/BecomeSeller";
import instance from "../../utils/AxiosInstance";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [card, setCard] = useState([]); // Initialize as an empty array
  const [trigger, setTrigger] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  };

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
  const userId = userDetails?._id;
  const role = userDetails?.role;

  console.log("Token data", userDetails);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await instance.get(`/user/${userId}`);
        if (res.data) {
          setUser(res.data);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    if (userId) {
      getData();
    }
  }, [userId]);

  console.log("user Data", user);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await instance.get(`/product/user`, {
          params: { user_id: userId },
        });
        if (res.data) {
          setCard(res.data);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    if (userId) {
      getProduct();
    }
  }, [userId, trigger]);

  const [itemAddPopup, setItemAddPopup] = useState(false);
  const [itemEditPopup, setItemEditPopup] = useState(false);
  const [becomeSellerPopup, setBecomeSellerPopup] = useState(false);

  const itemAddPopupWindow = () => {
    setItemAddPopup(true);
  };
  const colseItemAddPopupWindow = () => {
    setItemAddPopup(false);
    setTrigger((prev) => !prev);
  };

  const itemEdditPopupWindow = (productId, userId) => {
    setSelectedProductId(productId);
    setItemEditPopup(true);
  };
  const closeItemEditPopupWindow = () => {
    setItemEditPopup(false);
    setSelectedProductId(null);
    setTrigger((prev) => !prev);
  };

  const becomeSellerPopupWindow = () => {
    setBecomeSellerPopup(true);
  };
  const closeBecomeSellerPopupWindow = () => {
    setBecomeSellerPopup(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      {itemAddPopup && (
        <ItemAdd colseItemAddPopupWindow={colseItemAddPopupWindow} />
      )}
      {itemEditPopup && (
        <ItemEdit
          userId={userId}
          productId={selectedProductId}
          closeItemEditPopupWindow={closeItemEditPopupWindow}
        />
      )}
      {becomeSellerPopup && (
        <BecomeSeller
          closeBecomeSellerPopupWindow={closeBecomeSellerPopupWindow}
        />
      )}
      <div className="profle-container">
        <div className="left">
          <div className="image">
            <img src={profileImage} alt="Profile" />
          </div>
          <div className="seller-details">
            <div className="name">{user.fullName}</div>
            <div className="username">@{user.userName}</div>
            <div className="description">{user.discription}</div>
            <div className="contac-detail">
              <p
                style={{ color: "blue", fontWeight: "bold", fontSize: "17px" }}
              >
                Contact Details
              </p>
              <div className="contact-email">
                <MdOutlineEmail size={22} />
                <p>{user.email}</p>
              </div>
              {user.contactNo ? (
                <div className="contact-email">
                  <MdOutlineLocalPhone size={22} />
                  <p>{user.contactNo}</p>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="buttons-section">
            {role === "user" ? (
              <button className="seller" onClick={becomeSellerPopupWindow}>
                Become a seller
              </button>
            ) : (
              <button
                className="seller"
                style={{ display: "none" }}
                onClick={becomeSellerPopupWindow}
              >
                Become a seller
              </button>
            )}

            <button className="seller">Cart</button>
            <button className="logout" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
        <div className="right">
          {role === "seller" ? (
            <div className="top">
              <a href="/order" style={{ textDecoration: "none" }}>
                <p>RECEIVED ORDERS</p>
              </a>

              <div className="Add-card">
                <IoIosAdd className="add" onClick={itemAddPopupWindow} />
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <div className="bottom">
            {card.length > 0 ? (
              card.map((item, index) => (
                <div
                  key={index}
                  className="card"
                  onClick={() => itemEdditPopupWindow(item._id, userId)}
                >
                  <img src={item.Image} alt={item.title} />
                  <p>{item.productName}</p>
                </div>
              ))
            ) : (
              <div className="no-products">
                <p>No Product Listed</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}