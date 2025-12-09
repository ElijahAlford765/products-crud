import { useContext, useState } from "react";
import { CartContext } from "../CartContext";

const Checkout = () => {
  const { cartItems, total, clearCart } = useContext(CartContext);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    // Validate shipping info
    for (const field in shippingInfo) {
      if (!shippingInfo[field].trim()) {
        return alert(`Please fill in ${field}`);
      }
    }

    if (!cartItems.length) return alert("Cart is empty!");

    try {
      await clearCart(); // Clears backend cart too
      alert(
        `Order placed successfully!\nShipping to: ${shippingInfo.name}, ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zip}`
      );
      // TODO: Send shippingInfo + cartItems to backend for order processing
    } catch (err) {
      console.error(err);
      alert(" failed place order.");
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id || item._id}>
              {item.quantity} × {item.name} — $
              {Number(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <div className="total">Total: ${total.toFixed(2)}</div>
      </div>

      <div className="shipping-form">
        <h3>Shipping Information</h3>
        <label>Name</label>
        <input type="text" name="name" value={shippingInfo.name} onChange={handleChange} />

        <label>Address</label>
        <input type="text" name="address" value={shippingInfo.address} onChange={handleChange} />

        <label>City</label>
        <input type="text" name="city" value={shippingInfo.city} onChange={handleChange} />

        <label>State</label>
        <input type="text" name="state" value={shippingInfo.state} onChange={handleChange} />

        <label>ZIP</label>
        <input type="text" name="zip" value={shippingInfo.zip} onChange={handleChange} />

        <label>Phone</label>
        <input type="text" name="phone" value={shippingInfo.phone} onChange={handleChange} />
      </div>

      <button className="confirm-btn" onClick={handleCheckout}>
        Confirm Order
      </button>
    </div>
  );
};

export default Checkout;
