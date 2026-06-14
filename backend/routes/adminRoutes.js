const express = require("express");
const router = express.Router();

const {getAllMembers  , updatePaymentStatus , deleteMember , updateMember , getAdminStats , getRevenueStats ,  getTopMembers , getAttendanceStats} = require("../controllers/adminController");
const { auth  } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

router.get("/attendance-stats", auth, admin, getAttendanceStats );
router.get("/top-members", auth, admin, getTopMembers );
router.get("/revenue-stats", auth, admin, getRevenueStats );
router.get("/members", auth, admin, getAllMembers );
router.get("/stats", auth,  admin, getAdminStats );
router.patch("/payment-status/:id", auth, admin, updatePaymentStatus );
router.delete("/member/:id", auth, admin, deleteMember );
router.put( "/member/:id", auth, admin,updateMember );

module.exports = router;