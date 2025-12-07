const model = require('../models/userModel');
const bcrypt = require('bcryptjs');

// --- REGISTER ---
async function register(req, res) {
    const { username, firstname, lastname, email, password } = req.body;

    if (!email || !password || (!username && (!firstname || !lastname))) {
        return res.status(400).send("Missing required fields.");
    }

    try {
        const cleanEmail = email.trim().toLowerCase();
        const existingUser = await model.getUserByEmail(cleanEmail);
        if (existingUser) return res.status(400).send("Email already in use.");

        const hashed = await bcrypt.hash(password, 10);

        // Build username automatically if not provided
        let finalUsername = username;
        if (!finalUsername) {
            finalUsername = (firstname + lastname).toLowerCase().replace(/\s+/g, "") + Math.floor(Math.random() * 10000);
        }

        const newUser = await model.addUser({
            username: finalUsername,
            email: cleanEmail,
            password_hash: hashed,
            firstname,
            lastname
        });

        req.session.user = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        };

        res.status(201).json(req.session.user);
    } catch (err) {
        console.error("REGISTER ERROR:", err);
        res.status(500).send("Server error.");
    }
}

// --- LOGIN ---
async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send("Missing email or password.");

    try {
        const cleanEmail = email.trim().toLowerCase();
        const user = await model.getUserByEmail(cleanEmail);
        if (!user) return res.status(401).send("Invalid credentials.");

        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) return res.status(401).send("Invalid credentials.");

        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        res.json(req.session.user);
    } catch (err) {
        console.error("LOGIN ERROR:", err);
        res.status(500).send("Server error.");
    }
}

// --- LOGOUT ---
function logout(req, res) {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.json({ success: true });
    });
}

// --- GET CURRENT USER ---
function getMe(req, res) {
    if (!req.session.user) return res.json({ loggedIn: false });
    res.json({ loggedIn: true, user: req.session.user });
}

// Optional CRUD
async function fetchAllUsers(req, res) {
    try {
        const users = await model.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error fetching users.");
    }
}

async function fetchUserById(req, res) {
    try {
        const user = await model.getOneUserById(req.params.id);
        if (!user) return res.status(404).send("User not found.");
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error fetching user.");
    }
}

async function removeUser(req, res) {
    try {
        const deleted = await model.deleteUser(req.params.id);
        if (!deleted) return res.status(404).send("User not found.");
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error deleting user.");
    }
}

module.exports = {
    register,
    login,
    logout,
    getMe,
    fetchAllUsers,
    fetchUserById,
    removeUser
};
