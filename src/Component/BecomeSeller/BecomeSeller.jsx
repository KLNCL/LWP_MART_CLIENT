import React, { useState } from "react";
import "./BecomeSeller.scss";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlinePhotoCamera } from "react-icons/md";
import instance from "../../utils/AxiosInstance";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function BecomeSeller({closeBecomeSellerPopupWindow, selectedEmail}) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [discription, setDiscription] = useState("");

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

  // Handle form submission
  const handleBecomeSeller = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!fullName || !address || !contactNo || !email || !discription) {
      setErrors("Please fill in all fields.");
      return;
    }

    // Prepare the payload
    const payload = {
      fullName,
      address,
      contactNo,
      email,
      discription,
      image: "gsdgsdy",
      role: "seller", // Update the user's role to "seller"
    };

    try {
      // Send the request to update the user
      const response = await instance.post(`/updateuser/${userId}`, payload);

      if (response.status === 200) {
        setSuccess("You are now a seller!");
        setErrors("");
        props.closeBecomeSellerPopupWindow();
        localStorage.removeItem("authToken");
        navigate("/login"); // Redirect to the profile page
      } else {
        setErrors("Failed to update user. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setErrors(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="BecomeSeller-container">
      <div className="card">
        <div
          style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
        >
          <IoMdCloseCircle
            onClick={closeBecomeSellerPopupWindow}
            size={28}
            color="red"
            style={{ paddingRight: "5px", marginTop: "5px", cursor: "pointer" }}
          />
        </div>
        <div className="title">
          <h1 style={{ paddingBottom: "15px" }}>Welcome to LWP Mart</h1>
          <p>Please complete your profile to get started</p>
        </div>
        <div className="profile-picture">
          <p>Select a profile picture</p>
          <div className="image">
            <MdOutlinePhotoCamera size={35} style={{ cursor: "pointer" }} />
          </div>
        </div>
        <div className="body">
          <div className="input-filed">
            <span>Full Name:</span>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="input-filed">
            <span>Address:</span>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="input-filed">
            <span>Contact No:</span>
            <input
              type="text"
              placeholder="Contact No"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
            />
          </div>
          <div className="input-filed">
            <span>Email:</span>
            <input
              type="text"
              placeholder="Email"
              value={selectedEmail}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-filed">
            <span>Description:</span>
            <textarea
              style={{
                width: "200px",
                borderRadius: "6px",
                backgroundColor: "rgba(210, 209, 209, 0.319)",
              }}
              rows={4}
              placeholder="Description"
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
            />
          </div>
        </div>

        {/* Display errors or success messages */}
        {errors && (
          <p style={{ color: "red", textAlign: "center" }}>{errors}</p>
        )}
        {success && (
          <p style={{ color: "green", textAlign: "center" }}>{success}</p>
        )}

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "28px",
            marginBottom: "18px",
          }}
        >
          <button onClick={handleBecomeSeller} style={{ marginRight: "20px" }}>
            Become a seller
          </button>
        </div>
      </div>
    </div>
  );
}