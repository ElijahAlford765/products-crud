import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import "../index.css";
const API_URL = "http://localhost:3000/api/users";
axios.defaults.withCredentials = true; 

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
        const res = await axios.post(`${API_URL}/login`, {
            email: form.email,
            password: form.password
        });
        setUser(res.data);
        navigate("/");
    } catch (err) {
        setError(err.response?.data || "Login failed");
    }
};


const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
        const res = await axios.post(`${API_URL}/register`, {
            username: form.username,
            email: form.email,
            password: form.password
        });
        setUser(res.data);
        navigate("/");
    } catch (err) {
        setError(err.response?.data || "Signup failed");
    }
};

  return (
    <div className="form-container">
      <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>
      {error && <p className="error-text">{error}</p>}

      {mode === "login" ? (
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit">Login</button>
          <p>
            Don't have an account?{" "}
            <span className="link" onClick={() => setMode("signup")}>Sign Up</span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleSignup}>
          <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit">Create Account</button>
          <p>
            Already have an account?{" "}
            <span className="link" onClick={() => setMode("login")}>Login</span>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
