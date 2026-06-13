const User = require("../models/user");
const Attendance = require("../models/attendance");
const Subscription = require("../models/subscription");


exports.getAllMembers = async(req,res)=>{

    try{

        const search = req.query.search || "";

        const users = await User.find({

            name:{
                $regex:search,
                $options:"i"
            }

        });

        res.json(users);

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
                membershipType,
                paymentStatus,
                role
            },

            {
                new:true,
                runValidators:true
            }

        );

        if(!user){

            return res.status(404).json({
                message:"User not found"
            });

        }

        res.status(200).json({

            message:"Member updated successfully",

            user

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