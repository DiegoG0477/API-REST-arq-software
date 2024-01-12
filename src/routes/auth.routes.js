const express= require("express");
const router = express.Router();
const authController = require('../controllers/auth.controller');

// router.get("/login/:email/:password", authController.login);
router.post("/login/:email/:password", authController.login);
router.post("/signup", authController.signUp);
router.post("/logout", authController.logout);

module.exports = router;