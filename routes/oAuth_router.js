const express = require("express");
const router = express.Router();
const { handleAuthCall } = require("../controller/googleAuthController");
const auth = require("../auth/oauth2client");

console.log(auth.url);

router.use(express.json());

router.get("/get", handleAuthCall);

module.exports = router;
