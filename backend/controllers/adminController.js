const User = require("../models/user");
const Attendance = require("../models/attendance");
const Subscription = require("../models/subscription");
const Payment = require("../models/payment");
const QRCode = require("qrcode");
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

exports.getExpiryAlerts = async(req,res)=>{

    try{

        const subscriptions =
        await Subscription.find({

            status:"Active"

        }).populate(

            "user",

            "name email"

        );

        const alerts = subscriptions
        .map(sub=>{

            const today =
            new Date();

            const endDate =
            new Date(sub.endDate);

            const daysLeft =
            Math.ceil(

                (endDate - today) /

                (1000 * 60 * 60 * 24)

            );

            return {

                name:
                sub.user?.name,

                email:
                sub.user?.email,

                plan:
                sub.plan,

                daysLeft

            };

        })
        .filter(item => item.daysLeft <= 7)
        .sort((a,b)=>
            a.daysLeft - b.daysLeft
        );

        res.json(alerts);

    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

};

exports.exportMembers = async(req,res)=>{

    try{

        const members =
        await User.find();

        let csv =

        "Name,Email,MembershipType,PaymentStatus\n";

        members.forEach(member=>{

            csv +=

            `${member.name},${member.email},${member.membershipType || ""},${member.paymentStatus || ""}\n`;

        });

        res.header(
            "Content-Type",
            "text/csv"
        );

        res.attachment(
            "members.csv"
        );

        return res.send(csv);

    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

};

exports.getNotifications = async(req,res)=>{

    try{

        // Expiring Memberships

        const subscriptions =
        await Subscription.find({

            status:"Active"

        });

        let expiringCount = 0;

        subscriptions.forEach(sub=>{

            const daysLeft =
            Math.ceil(

                (new Date(sub.endDate) - new Date())

                /(1000*60*60*24)

            );

            if(daysLeft <= 7){

                expiringCount++;

            }

        });

        // Pending Payments

        const pendingPayments =
        await Subscription.countDocuments({

            paymentStatus:"Pending"

        });

        // Today's Attendance

        const startOfDay =
        new Date();

        startOfDay.setHours(
            0,0,0,0
        );

        const totalMembers =
        await User.countDocuments({

            role:"User"

        });

        const presentToday =
        await Attendance.countDocuments({

            date:{
                $gte:startOfDay
            }

        });

        const absentToday =
        Math.max(
            totalMembers - presentToday,
            0
        );

        res.json({

            expiringCount,

            pendingPayments,

            absentToday

        });

    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

};


exports.generateQRCode = async(req,res)=>{

    try{

        const qrData = {

            gym:"SMART_GYM",

            date:
            new Date()
            .toISOString()
            .split("T")[0]

        };

        const qrImage =
        await QRCode.toDataURL(

            JSON.stringify(qrData)

        );

        res.json({

            qrImage

        });

    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

};