const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const userController = require("../controller/userController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/token/:token", authController.tokenDecode);

router.get("/get/:id", userController.get);
router.post("/update", userController.update);

module.exports = router;
