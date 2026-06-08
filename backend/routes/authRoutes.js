const express = require("express");

const router = express.Router();

const {signup} = require("../controllers/authController");
const {login} = require("../controllers/authController");

const {getUser , getProfile , updateProfile } = require("../controllers/authController");

const {auth} = require("../middleware/authMiddleware");


router.get("/profile",auth, getProfile);

router.put("/profile", auth, updateProfile );
router.get("/me",auth,getUser);

router.post("/signup",signup);
router.post("/login",login);

module.exports = router;