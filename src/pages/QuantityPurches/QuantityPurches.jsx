import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./QuantityPurches.scss"
import { BiCheckCircle } from "react-icons/bi"

export default function QuntityPurches() {
  const location = useLocation()
  const navigate = useNavigate()
  const { orderDetails } = location.state || {}

  // If no order details are provided, use mock data
  const items = orderDetails;

  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [contact, setContact] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleOrderNow = () => {
    if (!name || !address || !contact) {
      alert("Please fill in all fields")
      return
    }
    setIsSubmitted(true)
  }

  // Calculate total price
  const totalPrice = items.reduce((sum, item) => {
    return sum + Number.parseInt(item.price) * Number.parseInt(item.quantity)
  }, 0)
  

  return (
    <div className="purchase-page">
      <main className="main-content">
        {!isSubmitted ? (
          <div className="purchase-container2">
            <div className="card-fram">
              <h1>Purchase</h1>
              <div className="inputField">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="inputField">
                <label>Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your delivery address"
                />
              </div>
              <div className="inputField">
                <label>Contact Number</label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <button className="confirm-button" onClick={handleOrderNow}>
                Confirm
              </button>
            </div>

            <div className="right-side">
              <div className="order-summary">
                <h2>Order Summary</h2>
                <div className="customer-info">
                  <p>
                    <span className="label">Name:</span> {name || "Not provided"}
                  </p>
                  <p>
                    <span className="label">Address:</span> {address || "Not provided"}
                  </p>
                  <p>
                    <span className="label">Contact Number:</span> {contact || "Not provided"}
                  </p>
                </div>

                <div className="products-list">
                  <h3>Products</h3>
                  {items.map((item, index) => (
                    <div key={index} className="product-item">
                      <div className="product-details">
                        <p className="product-name">{item.productName}</p>
                        <p className="product-quantity">Quantity: {item.quantity}</p>
                      </div>
                      <p className="product-price">Rs.{item.price}.00</p>
                    </div>
                  ))}

                  <div className="total-price">
                    <p>Total:</p>
                    <p>${totalPrice}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="complete-the-perches-container">
            <div className="complete-the-perches">
            <BiCheckCircle size={50} color="green" />
            <h1>You have completed the purchase.</h1>
            <button className="home-button" onClick={() => navigate("/")}>
              Return to Home
            </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}