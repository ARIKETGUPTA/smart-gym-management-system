const User = require("../models/user");
const Attendance = require("../models/attendance");
const Subscription = require("../models/subscription");


exports.getAllMembers =
async(req,res)=>{

    try{

        const users =
        await User.find()
        .select("-password");

        res.json(users);

    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};

exports.getStats =
async(req,res)=>{

    try{

        const totalMembers =
        await User.countDocuments();

        const activeSubscriptions =
        await Subscription.countDocuments({
            status:"Active"
        });

        const expiredSubscriptions =
        await Subscription.countDocuments({
            status:"Expired"
        });

        const today = new Date();

        today.setHours(0,0,0,0);

        const todayAttendance =
        await Attendance.countDocuments({

            date:{
                $gte:today
            }

        });

        res.json({

            totalMembers,

            activeSubscriptions,

            expiredSubscriptions,

            todayAttendance

        });

    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};

exports.updatePaymentStatus =
async(req,res)=>{

    try{

        const {id} = req.params;

        const subscription =
        await Subscription.findById(id);

        if(!subscription){

            return res.status(404).json({
                message:"Subscription not found"
            });

        }

        subscription.paymentStatus =
        "Paid";

        await subscription.save();

        res.json({

            message:
            "Payment status updated",

            subscription

        });

    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};