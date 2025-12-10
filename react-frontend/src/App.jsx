// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
import { CartProvider } from "./CartContext"; 
import "./App.css";

import Home from "./components/Home";
import ProductDetailsComponent from "./components/ProductDetailsComponent";
import ProductListComponent from "./components/ProductListComponent";
import AddProductComponent from "./components/AddProductComponent";
import ProductsAdminPage from "./components/ProductsAdminPage";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Checkout from "./components/Checkout";
import SalesPage from './components/SalesPage';
import SneakerSearch from "./components/SneakerSearch";
import PopularSneakers from "./components/PopularSneakers";

function App() {
  return (
    <UserProvider>
      <CartProvider> {}
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductListComponent />} />
              <Route path="/products/:id" element={<ProductDetailsComponent />} />
              <Route path="/add-product" element={<AddProductComponent />} />
              <Route path="/admin/products" element={<ProductsAdminPage />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/login" element={<Login />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/sell" element={<SalesPage />} />
              <Route path="/sneakers" element={<SneakerSearch />} />
              <Route path="/popular" element={<PopularSneakers />} />

            </Routes>
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
