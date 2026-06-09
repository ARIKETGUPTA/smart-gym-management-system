const User = require("../models/user");
const Attendance = require("../models/attendance");
const Subscription = require("../models/subscription");

exports.getDashboardData =
async(req,res)=>{

    try{

        const userId = req.user.id;

        const user =
        await User.findById(userId)
        .select("-password");

        const subscription =
        await Subscription.findOne({
            user:userId
        });

        const attendanceCount =
        await Attendance.countDocuments({
            user:userId
        });

        let daysRemaining = 0;

        if(subscription){

            daysRemaining =
            Math.ceil(

                (subscription.endDate - new Date())

                /

                (1000*60*60*24)

            );

        }

        res.status(200).json({

            name:user.name,

            email:user.email,

            membership:
            subscription?.plan || null,

            paymentStatus:
            subscription?.paymentStatus || null,

            daysRemaining,

            attendanceCount

        });

    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

};