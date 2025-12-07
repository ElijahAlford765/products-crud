import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post("/api/users/logout", {}, { withCredentials: true });
    setUser(null);
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  );
};

export default LogoutButton;
