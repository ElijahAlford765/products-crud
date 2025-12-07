import { useContext } from 'react';
import { CartContext } from '../CartContext';
import { Link } from 'react-router-dom';
import '../index.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  if (!cartItems.length) {
    return <p className="cart-empty">Your cart is empty.</p>;
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Gender</th>
            <th>Size</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map(item => (
            <tr key={item.id || item._id}>
              <td>{item.name}</td>
              <td>{item.gender}</td>
              <td>{item.size}</td>

              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  className="cart-qty-input"
                  onChange={e => updateQuantity(item.cart_id || item.id, parseInt(e.target.value))}

                />
              </td>

              <td>${item.price ? Number(item.price).toFixed(2) : "0.00"}</td>


              <td>
                <button
                  className="cart-remove-btn"
                  onClick={() => removeFromCart(item.cart_id)}

                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-checkout-container">
        <Link to="/checkout" className="cart-checkout-btn">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
