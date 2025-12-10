
import { useContext } from "react";
import { UserContext } from "./UserContext";
import api from "./api";

const LogoutButton = () => {
  const { setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await api.post("/users/logout");
      setUser(null);                
      alert("You have been logged out.");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Failed to logout. Try again.");
    }
  };

  return (
    <button onClick={handleLogout} style={{ padding: "8px 12px" }}>
      Logout
    </button>
  );
};

export default LogoutButton;
