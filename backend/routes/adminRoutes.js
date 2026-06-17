const express = require("express");
const router = express.Router();

const {getAllMembers  , updatePaymentStatus , deleteMember , updateMember , getAdminStats , getRevenueStats ,  getTopMembers , getAttendanceStats , getMemberDetails , getExpiryAlerts , exportMembers} = require("../controllers/adminController");
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
router.get("/member/:id" , auth , admin, getMemberDetails);
router.get("/expiry-alerts",auth,admin,getExpiryAlerts );
router.get("/export-members",auth,admin,exportMembers);

module.exports = router;