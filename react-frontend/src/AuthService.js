// src/AuthService.js
const AuthService = {
  signup: async (user) => {
    console.log("Sign-Up data:", user);
    // Normally you would send a POST request to your backend here
    return { success: true, message: "User registered successfully!" };
  },

  login: async (credentials) => {
    console.log("Login data:", credentials);
    // Normally you would send a POST request to your backend here
    if (credentials.email === "test@test.com" && credentials.password === "1234") {
      return { success: true, token: "fake-jwt-token", user: { name: "Test User", email: credentials.email } };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  },
};

export default AuthService;
