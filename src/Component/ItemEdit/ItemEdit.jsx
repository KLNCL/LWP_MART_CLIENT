import React, { useEffect, useState } from 'react';
import "./ItemEdit.scss";
import { IoMdCloseCircle } from "react-icons/io";
import instance from '../../utils/AxiosInstance';

export default function ItemEdit({ productId, closeItemEditPopupWindow, userId }) {
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const [productName, setProductName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [discription, setDiscription] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await instance.get(`/products/${productId}`);
        if (res.data) {
          setProductName(res.data.productName);
          setQty(res.data.qty);
          setPrice(res.data.price);
          setDiscription(res.data.discription);
        }
      } catch (err) {
        console.error("Error fetching product data:", err);
      }
    };

    if (productId) {
      getProductData();
    }
  }, [productId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      productName,
      qty,
      price,
      discription,
    };

    try {
      const response = await instance.post(`/updateproduct/${productId}`, payload);

      if (response.status === 200) {
        setSuccess("Product Updated Successfully!");
        setErrors("");
        closeItemEditPopupWindow();
      } else {
        setErrors("Failed to Update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setErrors(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    }
  };

  const handleDelete = async () => {
    try {
      const response = await instance.delete(`/deleteproduct/${productId}`);

      if (response.status === 200) {
        setSuccess("Product Deleted Successfully!");
        setErrors("");
        closeItemEditPopupWindow(); // Close the popup after successful deletion
      } else {
        setErrors("Failed to Delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setErrors(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  return (
    <div className="item_edit-container">
      <div className="card">
        <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
          <IoMdCloseCircle onClick={closeItemEditPopupWindow} size={28} color='red' style={{ paddingRight: "5px", marginTop: "5px", cursor: "pointer" }} />
        </div>
        <div className="title">
          <p style={{ paddingBottom: "15px" }}>{productName} Update</p>
        </div>

        <div className="body">
          <div className='input-filed'>
            <span style={{ marginBottom: "5px" }}>Product Name:</span>
            <input type='text' value={productName} onChange={(e) => setProductName(e.target.value)} disabled={!isEditMode} />
          </div>
          <div className="input-filed">
            <span>Quantity:</span>
            <input type='text' value={qty} onChange={(e) => setQty(e.target.value)} disabled={!isEditMode} />
          </div>
          <div className="input-filed">
            <span>Unit Price:</span>
            <input type='text' value={price} onChange={(e) => setPrice(e.target.value)} disabled={!isEditMode} />
          </div>
          <div className="input-filed">
            <span>Description:</span>
            <textarea value={discription} style={{ width: "200px" }} rows={4} onChange={(e) => setDiscription(e.target.value)} disabled={!isEditMode} />
          </div>
        </div>
        <div className='updating'>
          <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginTop: "5px", marginBottom: "20px" }}>
            {isEditMode ? (
              <button style={{ marginRight: "20px" }} onClick={handleUpdate}>Update</button>
            ) : (
              <button style={{ marginRight: "20px" }} onClick={handleEditClick}>Edit</button>
            )}
          </div>
          <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginTop: "5px", marginBottom: "20px" }}>
            <button style={{ marginRight: "20px" }} onClick={handleDelete} >Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}