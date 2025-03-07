import { useEffect, useState } from "react"
import "./Cart.scss"
import { IoTrashBin } from "react-icons/io5"
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import instance from "../../utils/AxiosInstance"

export default function Cart() {
  const [cart, setCart] = useState([])
  const [quantities, setQuantities] = useState({})
  const navigate = useNavigate()

  const getUserDetailsFromToken = () => {
    const token = localStorage.getItem("authToken")
    if (!token) return null
    try {
      return jwtDecode(token)
    } catch (error) {
      console.error("Invalid token", error)
      return null
    }
  }

  const userDetails = getUserDetailsFromToken()
  const userId = userDetails?._id

  useEffect(() => {
    const getCartData = async () => {
      try {
        const res = await instance.get(`/getUser/${userId}`)
        if (res.data) {
          setCart(res.data)
          const initialQuantities = res.data.reduce((acc, item) => {
            acc[item._id] = Number.parseInt(item.cartqty) || 1
            return acc
          }, {})
          setQuantities(initialQuantities)
        }
      } catch (err) {
        console.error("Error fetching cart details:", err)
      }
    }
    if (userId) getCartData()
  }, [userId])

  const handleRemoveFromCart = async (cartId) => {
    try {
      const res = await instance.delete(`/removeCart/${cartId}`)
      if (res.status === 200) {
        setCart((prevCart) => prevCart.filter((item) => item._id !== cartId))
        alert("Item removed from cart")
      }
    } catch (error) {
      console.error("Error removing item from cart:", error)
      alert("Failed to remove item from cart")
    }
  }

  const handleUpdateQuantity = async (cartId, newQuantity) => {
    try {
      const res = await instance.post(`/updateQty/${cartId}`, { cartqty: newQuantity.toString() })
      if (res.status === 200) {
        setQuantities((prev) => ({ ...prev, [cartId]: newQuantity }))
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error)
      alert("Failed to update cart quantity")
    }
  }

  const increaseQuantity = (id) => {
    setQuantities((prev) => {
      const newQuantity = (prev[id] || 0) + 1
      handleUpdateQuantity(id, newQuantity)
      return { ...prev, [id]: newQuantity }
    })
  }

  const decreaseQuantity = (id) => {
    setQuantities((prev) => {
      const newQuantity = Math.max((prev[id] || 0) - 1, 1)
      handleUpdateQuantity(id, newQuantity)
      return { ...prev, [id]: newQuantity }
    })
  }

  const totalPrice = cart.reduce((acc, item) => {
    const quantity = quantities[item._id] || 0
    const price = Number.parseFloat(item.price)
    return acc + price * quantity
  }, 0)

  const handleOrderNow = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!")
      return
    }

    const orderDetails = cart.map((item) => ({
      product_id: item.product_id,
      seller_id: item.seller_id,
      user_id: userId,
      image: item.image2,
      productName: item.productName2,
      price: Number.parseFloat(item.price),
      quantity: quantities[item._id] || 0,
    }))

    navigate("/cart/purchase", { state: { orderDetails, totalPrice } })
  }

  return (
    <div className="cart-container">
      <div className="header">
        <h1>
          <FaShoppingCart /> Shopping Cart
        </h1>
      </div>
      <div className="cart-content">
        <div className="cart-items">
          <div className="table-header">
            <a href="/" className="continue-shopping">
              <FaArrowLeft /> Continue Shopping
            </a>
          </div>
          <div className="table-body">
            {cart && cart.length > 0 ? (
              cart.map((item) => (
                <div className="cart-item" key={item._id}>
                  <div className="item-image">
                    <img src={`http://localhost:5000/api/image/${item.image2}`} alt={item.productName2} />
                  </div>
                  <div className="item-details">
                    <h2>{item.productName2}</h2>
                    <div className="quantity-control">
                      <button onClick={() => decreaseQuantity(item._id)}>-</button>
                      <input type="text" value={quantities[item._id] || 0} readOnly />
                      <button onClick={() => increaseQuantity(item._id)}>+</button>
                    </div>
                  </div>
                  <div className="item-price">
                    <h2>Rs. {(Number.parseFloat(item.price) * (quantities[item._id] || 0)).toFixed(2)}</h2>
                    <button className="remove-item" onClick={() => handleRemoveFromCart(item._id)}>
                      <IoTrashBin />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-cart-message">Your cart is empty.</p>
            )}
          </div>
        </div>
        <div className="cart-summary">
          <div className="summary-card">
            <h2>Order Summary</h2>
            <div className="summary-total">
              <span>Total:</span>
              <span>Rs {totalPrice.toFixed(2)}</span>
            </div>
            <button onClick={handleOrderNow} className="checkout-button">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}