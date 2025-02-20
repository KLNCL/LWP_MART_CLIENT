import React, { useState } from "react";
import "./ItemAdd.scss";
import { IoMdCloseCircle } from "react-icons/io";
import instance from "../../utils/AxiosInstance";
import { jwtDecode } from "jwt-decode";

export default function ItemAdd(props) {
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const [productName, setProductName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
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
  const user_id = userDetails?._id;
  const role = userDetails?.role;

  const handleProductAdd = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!productName || !qty || !price || !discription) {
      setErrors("Please fill in all fields.");
      return;
    }

    // Prepare the payload
    const payload = {
      user_id,
      productName,
      qty,
      price,
      discription,
      image:'dfd',
    };

    console.log(payload);
    

    try {
      // Send the request to update the user
      const response = await instance.post("/createproduct", payload);

      if (response.status === 200) {
        setSuccess("Product Added Successfully!");
        setErrors("");
        props.colseItemAddPopupWindow();
      } else {
        setErrors("Failed to adding product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setErrors(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="item_add-container">
      <div className="card">
        <div
          style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
        >
          <IoMdCloseCircle
            onClick={() => props.colseItemAddPopupWindow()}
            size={28}
            color="red"
            style={{ paddingRight: "5px", marginTop: "5px", cursor: "pointer" }}
          />
        </div>
        <div className="title">
          <p style={{ paddingBottom: "15px" }}>Add Item</p>
        </div>

        <div className="body">
          <div className="input-filed">
            <span style={{ marginBottom: "5px" }}>Product Name:</span>
            <input
              type="text"
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="input-filed">
            <span>Quantity:</span>
            <input type="text" onChange={(e) => setQty(e.target.value)} />
          </div>
          <div className="input-filed">
            <span>Unit Price:</span>
            <input type="text" onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="input-filed">
            <span>Add Image:</span>
            <input type="file" />
          </div>
          <div className="input-filed">
            <span>Description:</span>
            <textarea
              style={{ width: "200px" }}
              rows={4}
              onChange={(e) => setDiscription(e.target.value)}
            />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "5px",
            marginBottom: "20px",
          }}
        >
          <button style={{ marginRight: "20px" }} onClick={handleProductAdd}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}