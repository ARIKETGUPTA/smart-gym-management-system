const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/authMiddleware");
const {markAttendance} = require("../controllers/attendanceController");
const {getAttendanceHistory} = require("../controllers/attendanceController");
const { autoMarkAttendance } = require("../controllers/attendanceController");

router.post("/mark",auth ,markAttendance);
router.post( "/auto-mark", auth, autoMarkAttendance);

router.get("/history", auth, getAttendanceHistory);
module.exports = router;