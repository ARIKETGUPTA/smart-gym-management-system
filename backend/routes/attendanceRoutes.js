const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/authMiddleware");
const {markAttendance} = require("../controllers/attendanceController");
const {getAttendanceHistory , getWeeklyAttendance , autoMarkAttendance , getAttendanceStats, getDashboardStats , scanAttendance} = require("../controllers/attendanceController");


router.post("/mark",auth ,markAttendance);
router.post( "/auto-mark", auth, autoMarkAttendance);
router.get("/stats",auth, getAttendanceStats);
router.get("/weekly",auth,getWeeklyAttendance);
router.get("/history", auth, getAttendanceHistory);
router.get("/dashboard-stats",auth, getDashboardStats );
router.post(
    "/scan",
    auth,
    scanAttendance
);
module.exports = router;