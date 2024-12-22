import React, { useState, useEffect } from "react";
import "./Navigation.scss";
import { FaBars, FaTimes, FaCartPlus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

// const decodeJWT = (token) => {
//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     return payload;
//   } catch (error) {
//     console.error("Invalid JWT token", error);
//     return null;
//   }
// };

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const token = localStorage.getItem("authToken"); // Use correct key for token
    if (token) {
      setIsLoggedIn(true);
    } else {
      console.log("No token found, user is not logged in.");
    }
  };

  const handleLogout = () => {
    // Clear the token and update login state
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/"); // Redirect to homepage after logout
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="navigation-container">
      <nav>
        <input type="checkbox" id="check" className="check" />
        <label htmlFor="check">
          <FaBars className="btn" />
          <FaTimes className="cancel" />
        </label>
        <div className="name">
          <h1>LWP MART</h1>
        </div>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#Message">Message</a>
          </li>
          <li>
            <a href="#Contact Us">Contact Us</a>
          </li>
          <li>
            <a href="/aboutUs">About</a>
          </li>

          <a href="/cart" style={{ marginRight: "30px", color: "white" }}>
            <FaCartPlus size={25} />
          </a>

          {isLoggedIn ? (
            <>
              <a
                href="/profile"
                style={{ marginRight: "30px", marginLeft: "10px", color: "white" }}
              >
                <CgProfile size={25} />
              </a>
            </>
          ) : (
            <button onClick={handleLoginRedirect}>
              Log In
            </button>
          )}

        </ul>
      </nav>
    </div>
  );
}