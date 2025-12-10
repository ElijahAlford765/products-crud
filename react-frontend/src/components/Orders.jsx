import { useState, useEffect } from 'react';
import OrdersService from '../OrdersService'; 

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [lastOrderShipping, setLastOrderShipping] = useState(null);
  const [lastOrderId, setLastOrderId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    OrdersService.getOrders()
      .then(res => {
        setOrders(res.data.orders);
        setLastOrderShipping(res.data.lastOrderShipping);
        setLastOrderId(res.data.lastOrderId);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading orders...</p>;
  if (!orders.length) return <p style={{ textAlign: 'center' }}>No orders have been placed yet.</p>;

  return (
    <div style={{ width: '90%', margin: '0 auto' }}>
      <h1>Order History</h1>
      {orders.map(order => (
        <div key={order.order_id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px', borderRadius: '5px' }}>
          <h3>Order #{order.order_id}</h3>
          <p><strong>Customer:</strong> {order.customer_name}</p>
          <p><strong>Date:</strong> {order.order_date}</p>
          <p><strong>Total:</strong> ${order.total_amount.toFixed(2)}</p>

          <h4>Items:</h4>
          <ul>
            {order.items.map(item => (
              <li key={item.id}>
                {item.product?.name || 'Unknown Product'} ({item.quantity} × ${item.price_at_purchase.toFixed(2)})
              </li>
            ))}
          </ul>

          {lastOrderShipping && order.order_id === lastOrderId && (
            <div>
              <h4>Shipping Info:</h4>
              <p>
                {lastOrderShipping.address}, {lastOrderShipping.city}, {lastOrderShipping.state}, {lastOrderShipping.zip}, {lastOrderShipping.country}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Orders;
