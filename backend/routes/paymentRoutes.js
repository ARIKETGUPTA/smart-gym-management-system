const express = require("express");
const router = express.Router();

const {createPayment, getPaymentHistory , createOrder }= require("../controllers/paymentController");

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

router.post(
    "/create-order",
    auth,
    createOrder
);

module.exports = router;