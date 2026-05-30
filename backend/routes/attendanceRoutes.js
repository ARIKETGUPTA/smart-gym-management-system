const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/authMiddleware");
const {markAttendance} = require("../controllers/attendanceController");
const {getAttendanceHistory} = require("../controllers/attendanceController");

router.post("/mark",auth ,markAttendance);

router.get("/history", auth, getAttendanceHistory);
module.exports = router;