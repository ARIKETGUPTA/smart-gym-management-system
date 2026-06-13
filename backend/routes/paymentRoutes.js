const express = require("express");
const router = express.Router();

const {createPayment, getPaymentHistory }= require("../controllers/paymentController");

const { auth } = require("../middleware/authMiddleware" );

router.post(
    "/create",
    auth,
    createPayment
);

router.get(
    "/history",
    auth,
    getPaymentHistory
);

module.exports = router;