import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ProductDetailsComponent from './components/ProductDetailsComponent';
import AddProductComponent from './components/AddProductComponent';
import ProductsAdminPage from './components/ProductsAdminPage';
import Cart from './components/Cart';
import Orders from './components/Orders';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetailsComponent />} />
          <Route path="/add-product" element={<AddProductComponent />} />
          <Route path="/admin/products" element={<ProductsAdminPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
           <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
