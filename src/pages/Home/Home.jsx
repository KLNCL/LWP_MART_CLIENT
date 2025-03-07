import React, { useEffect, useState } from "react";
import "./Home.scss";
import ProductView from "../../Component/ProductView/ProductView";
import instance from "../../utils/AxiosInstance";

export default function Home() {
  const [card, setCard] = useState([]); 
  const [productViewPopup, setProductViewPopup] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await instance.get("/product");
        if (res.data) {
          setCard(res.data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    getProduct();
  }, []);

  const productViewPopupWindow = (productId) => {
    setSelectedProductId(productId);
    setProductViewPopup(true);
  };

  const closeProductViewPopupWindow = () => {
    setProductViewPopup(false);
    setSelectedProductId(null);
  };

  // Filter products based on search query
  const filteredProducts = card.filter((item) =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {productViewPopup && selectedProductId && (
        <ProductView 
          productId={selectedProductId} 
          closeProductViewPopupWindow={closeProductViewPopupWindow} 
        />
      )}

      <div className="home-container">
        <div className="heder">
          <div className="search">
            <input 
              className="search" 
              type="text" 
              placeholder="Search..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div>
          <h1>Welcome to LWP MART</h1>
          <p>
            You can sell your wood products here and grow your business with us.
          </p>
        </div>

        <div className="bottom">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <div 
                key={index} 
                className="card" 
                onClick={() => productViewPopupWindow(item._id)}
              >
                <img src={`http://localhost:5000/api/image/${item.image}`} alt={item.productName} />
                <p>{item.productName}</p>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", fontSize: "18px" }}>No products found</p>
          )}
        </div>
      </div>
    </>
  );
}