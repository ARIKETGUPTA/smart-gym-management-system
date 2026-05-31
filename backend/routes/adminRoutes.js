const express = require("express");
const router = express.Router();

const {
    getAllMembers,
    getStats,
    updatePaymentStatus
} =
require("../controllers/adminController");

const {
    auth
} =
require("../middleware/authMiddleware");

const {
    admin
} =
require("../middleware/adminMiddleware");

router.get(
    "/members",
    auth,
    admin,
    getAllMembers
);

router.get(
    "/stats",
    auth,
    admin,
    getStats
);

router.patch(
    "/payment-status/:id",
    auth,
    admin,
    updatePaymentStatus
);

module.exports = router;