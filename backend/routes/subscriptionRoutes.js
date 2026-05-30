const express = require("express");
const router = express.Router();

const {
    createSubscription,
    getMySubscription
} = require("../controllers/subscriptionController");

const {
    auth
} = require("../middleware/authMiddleware");

// Create Subscription
router.post(
    "/create",
    createSubscription
);

// Get Logged-in User Subscription
router.get(
    "/me",
    auth,
    getMySubscription
);

module.exports = router;