import React, { useState } from 'react'
import "./Home.scss"
import ProductView from '../../Component/ProductView/ProductView';

export default function Home() {

    const card = [
        {Image:"/Item/card-1.jpg", title:"Wood Furniture"},
        {Image:"/Item/card.jpg", title:"Wood Furniture"},
        {Image:"/Item/card-3.jpg", title:"Wood Furniture"},
        {Image:"/Item/card-1.jpg", title:"Wood Furniture"},
        {Image:"/Item/card.jpg", title:"Wood Furniture"},
        {Image:"/Item/card-3.jpg", title:"Wood Furniture"},
      ]

      const [productViewPopup, setProductViewPopup] = useState(false);

      const productViewPopupWindow = () => {
        setProductViewPopup(true)
      }
      const closeProductViewPopupWindow = () =>{
        setProductViewPopup(false)
      }

    return (
        <>
        {productViewPopup && <ProductView closeProductViewPopupWindow={closeProductViewPopupWindow}/>}
        <div className="home-container">
            <div className="heder">
                <div className="search">
                  <input className="search" type="text" placeholder="Search..." />
                </div>
                <h1>Wellcome to LWP MART</h1>
                <p>You can sell your wood product here and grow your businss withing us</p>

            </div>
            <div className="bottom">
          {card.map((item, index) => (
              <div key={index} className="card" onClick={productViewPopupWindow}>
                <img src={item.Image} alt={item.title} />
                <p>{item.title}</p>
              </div>
            ))}
           </div>
        </div>
        </>
    )
}
