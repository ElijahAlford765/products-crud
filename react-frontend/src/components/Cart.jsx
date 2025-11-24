import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartService from '../CartService'; // Create a service to handle API calls

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CartService.getCartItems()
      .then(res => setItems(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const updateQuantity = (itemId, quantity) => {
    CartService.updateCartItem(itemId, quantity)
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  };

  const removeItem = (itemId) => {
    CartService.removeCartItem(itemId)
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Loading cart...</p>;
  if (!items.length) return <p style={{ textAlign: 'center', fontSize: '1.2em', marginTop: '20px' }}>Your cart is empty.</p>;

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Your Cart</h1>
      <table style={{ width: '90%', margin: '0 auto', borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Product</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Size</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Qty</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Price</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.cart_item_id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{item.product.name}</td>
              <td style={{ padding: '10px' }}>{item.product.size || 'N/A'}</td>
              <td style={{ padding: '10px' }}>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => updateQuantity(item.cart_item_id, parseInt(e.target.value))}
                  style={{ width: '60px', padding: '4px' }}
                />
              </td>
              <td style={{ padding: '10px' }}>${item.price.toFixed(2)}</td>
              <td style={{ padding: '10px' }}>
                <button
                  onClick={() => removeItem(item.cart_item_id)}
                  style={{ padding: '4px 8px', cursor: 'pointer' }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link
          to="/checkout"
          style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px', fontSize: '1.1em' }}
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
