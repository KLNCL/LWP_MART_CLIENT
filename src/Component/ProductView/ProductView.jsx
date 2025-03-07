import React, { useEffect, useState } from "react";
import "./ProductView.scss";
import { IoMdCloseCircle } from "react-icons/io";
import productImage from "../../Image/card-2.jpg";
import profileImage from "../../Image/Profile.jpg";
import instance from "../../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProductView({ productId, closeProductViewPopupWindow }) {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({}); // Initialize as an object
  const navigate = useNavigate(); // Initialize useNavigate

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
    

  useEffect(() => {
    if (!productId) return; // Prevent unnecessary API calls

    const getProduct = async () => {
      try {
        setLoading(true);
        const res = await instance.get(`/products/${productId}`);
        if (res.data) {
          setProductData(res.data);
        }
      } catch (err) {
        console.error("Error fetching product data:", err);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  useEffect(() => {
    if (!productData || !productData.user_id) return; // Ensure productData exists before calling API

    const getUserData = async () => {
      try {
        const res = await instance.get(`/user/${productData.user_id}`);
        if (res.data) {
          setUser(res.data);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    getUserData();
  }, [productData]); // Trigger when productData updates

  // Function to handle "Order Now" button click
  const handleOrderNow = () => {
    if (!productData) return;

    // Prepare the data to pass to the /purchase route
    const orderDetails = {
      product_id: productData._id, // Assuming _id is the product ID
      seller_id: productData.user_id, // Assuming user_id is the seller ID
      user_id: userId, // Replace with the actual current user ID (e.g., from token or state)
      image: productData.image, // Pass the product image
    };

    // Navigate to /purchase with state
    navigate("/purchase", { state: { orderDetails } });
  };
  

  const handleCart = async () => {
    try {
      // Prepare the payload
      const payload = {
        product_id: productData._id, 
        user_id: userId,
        cartqty: "1",
      };     

      // Call the API
      const response = await instance.post('/addToCart', payload);

      // Handle success
      if (response.status === 200) {
        alert("Add to cart successfully!");
      } else {
        alert("Failed to adding cart.");
      }
    } catch (error) {
      console.error("Error product adding to cart:", error);
      alert("An error occurred while product adding to cart.");
    }
  };


  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (!productData) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="product_view-container">
      <div className="card">
        <div className="top">
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <IoMdCloseCircle
              onClick={closeProductViewPopupWindow}
              size={28}
              color="red"
              style={{
                paddingRight: "5px",
                marginTop: "5px",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        <div className="body">
          <div className="left">
            <div className="image">
              <img src={`http://localhost:5000/api/image/${productData.image}`} />
            </div>
            <div className="seller-detail">
              <img src={profileImage} />
              <p>{user.fullName}</p>
            </div>
          </div>
          <div className="right">
            <div className="product-details">
              <h3>Product Name:</h3>
              <p>{productData.productName}</p>
            </div>
            <div className="product-details">
              <h3>Price:</h3>
              <p>Rs.{productData.price}.00</p>
            </div>
            <div className="product-details">
              <h3>Qty:</h3>
              <p>{productData.qty}</p>
            </div>
            <div className="product-details">
              <h3>Description:</h3>
              <p>{productData.discription}</p>
            </div>
            <div className="product-details">
              <h3>Mobile No:</h3>
              <p>{user.contactNo}</p>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "5px",
              marginBottom: "20px",
            }}
          >
            <button
              style={{ marginRight: "20px" }}
              onClick={handleOrderNow} // Use onClick instead of <a>
            >
              Order Now
            </button>
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
            <button style={{ marginRight: "20px" }} onClick={handleCart}>Add Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}