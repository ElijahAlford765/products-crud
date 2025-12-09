import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import LogoutButton from "../LogoutButton";
import '../index.css';

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>   |{' '}
      <Link to="/products">Products</Link>   |{' '}
      <Link to="/cart">Cart</Link>   |{' '}
      <Link to="/sell">Sell</Link> |{' '}

      {user ? (
        <>
          <span className="welcome">Welcome, {user.name || user.username}</span>
         <LogoutButton />
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
