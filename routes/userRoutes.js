const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/me", userController.getMe);


router.get("/", userController.fetchAllUsers);
router.get("/:id", userController.fetchUserById);
router.delete("/:id", userController.removeUser);

module.exports = router;
