const User = require("../models/user");
const Attendance = require("../models/attendance");
const Subscription = require("../models/subscription");
const Payment = require("../models/payment");

exports.getAllMembers = async(req,res)=>{

    try{

        const search =
        req.query.search || "";

        const members =
        await User.find({

            name:{
                $regex:search,
                $options:"i"
            }

        });

        res.json(members);

    }
    catch(error){

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
exports.deleteMember = async(req,res)=>{

    try{

        const { id } = req.params;

        const user = await User.findById(id);

        if(!user){

            return res.status(404).json({
                message:"User not found"
            });

        }
        if(user.role === "Admin"){

            return res.status(400).json({

                message:
                "Cannot delete admin"

            });

        }

        await User.findByIdAndDelete(id);

        res.status(200).json({
            message:"Member deleted successfully"
        });

    }
    catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};

exports.updateMember = async(req,res)=>{
    console.log("BODY:", req.body);
    console.log("ID:", req.params.id);

try{

    const { id } = req.params;

    const {

        name,

        membershipType,

        paymentStatus,

        role

    } = req.body;

    const user =
await User.findByIdAndUpdate(

    id,

    {

        name,

        role,

        membershipType,

        paymentStatus

    },

    {

        new:true

    }

);

    if(!user){

        return res.status(404).json({

            message:"User not found"

        });

    }

    const subscription =
    await Subscription.findOne({

        user:id

    });

    if(subscription){

        subscription.plan =
        membershipType;

        subscription.paymentStatus =
        paymentStatus;

        if(paymentStatus === "Paid"){

            subscription.status =
            "Active";

        }

        await subscription.save();

    }

    res.json({

        message:
        "Member updated successfully",

        user,

        subscription

    });

}
catch(error){

    res.status(500).json({

        error:error.message

    });

}


};



exports.getAdminStats = async(req,res)=>{

    try{

        const totalMembers =
        await User.countDocuments();

        const activeSubscriptions =
        await Subscription.countDocuments({

            status:"Active"

        });

        const subscriptions =
        await Subscription.find({

            paymentStatus:"Paid"

        });

        const totalRevenue =
        subscriptions.reduce(

            (sum,item)=>

            sum + item.price,

            0

        );

        const startOfDay =
        new Date();

        startOfDay.setHours(
            0,0,0,0
        );

        const endOfDay =
        new Date();

        endOfDay.setHours(
            23,59,59,999
        );

        const todayAttendance =
        await Attendance.countDocuments({

            date:{
                $gte:startOfDay,
                $lte:endOfDay
            }

        });

        res.json({

            totalMembers,
            activeSubscriptions,
            totalRevenue,
            todayAttendance

        });

    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

};

exports.getRevenueStats = async(req,res)=>{

    try{

        const payments =
        await Payment.find({

            status:"Paid"

        });

        const totalRevenue =
        payments.reduce(

            (sum,payment)=>

            sum + payment.amount,

            0

        );

        const startOfMonth =
        new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
        );

        const monthlyPayments =
        await Payment.find({

            status:"Paid",

            paymentDate:{
                $gte:startOfMonth
            }

        });

        const monthlyRevenue =
        monthlyPayments.reduce(

            (sum,payment)=>

            sum + payment.amount,

            0

        );

        const startOfDay =
        new Date();

        startOfDay.setHours(
            0,0,0,0
        );

        const endOfDay =
        new Date();

        endOfDay.setHours(
            23,59,59,999
        );

        const todayPayments =
        await Payment.find({

            status:"Paid",

            paymentDate:{
                $gte:startOfDay,
                $lte:endOfDay
            }

        });

        const todayRevenue =
        todayPayments.reduce(

            (sum,payment)=>

            sum + payment.amount,

            0

        );

        res.json({

            totalRevenue,

            monthlyRevenue,

            todayRevenue,

            totalPayments:
            payments.length

        });

    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

};

exports.getTopMembers = async(req,res)=>{

    try{

        const topMembers =
        await Attendance.aggregate([

            {

                $group:{

                    _id:"$user",

                    attendanceCount:{
                        $sum:1
                    }

                }

            },

            {

                $sort:{
                    attendanceCount:-1
                }

            },

            {

                $limit:5

            }

        ]);

        const populated =
        await User.populate(

            topMembers,

            {

                path:"_id",

                select:"name email"

            }

        );

        res.json(populated);

    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

};

exports.getAttendanceStats = async(req,res)=>{

    try{

        const today =
        new Date();

        const startOfDay =
        new Date();

        startOfDay.setHours(
            0,0,0,0
        );

        const startOfWeek =
        new Date();

        startOfWeek.setDate(
            today.getDate() - 7
        );

        const startOfMonth =
        new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        const todayAttendance =
        await Attendance.countDocuments({

            checkIn:{
                $gte:startOfDay
            }

        });

        const weeklyAttendance =
        await Attendance.countDocuments({

            checkIn:{
                $gte:startOfWeek
            }

        });

        const monthlyAttendance =
        await Attendance.countDocuments({

            checkIn:{
                $gte:startOfMonth
            }

        });

        res.json({

            todayAttendance,

            weeklyAttendance,

            monthlyAttendance

        });

    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

};

exports.getMemberDetails =async(req,res)=>{

try{

    const user =
    await User.findById(

        req.params.id

    );

    const subscription =
    await Subscription.findOne({

        user:req.params.id

    });

    const attendanceCount =
    await Attendance.countDocuments({

        user:req.params.id

    });

    res.json({

        user,

        subscription,

        attendanceCount

    });

}
catch(error){

    res.status(500).json({

        error:error.message

    });

}


};
