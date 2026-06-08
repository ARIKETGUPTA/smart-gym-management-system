const Attendance = require("../models/attendance");
const Subscription = require("../models/subscription");
const geolib = require("geolib");
const gymLocation = require("../config/gymLocation");

exports.markAttendance = async (req,res)=>{
    try{

        const userId = req.user.id;
        const {method} = req.body;

        // check subscription active
        const subscription = await Subscription.findOne({user:userId});

        // if(!subscription){
        //     return res.status(404).json({
        //         message:"No subscription found"
        //     });
        // }

        // if(subscription.status === "Expired"){
        //     return res.status(400).json({
        //         message:"Subscription expired"
        //     });
        // }

        // check today's attendance

        const startOfDay = new Date();
        startOfDay.setHours(0,0,0,0);

        const endOfDay = new Date();
        endOfDay.setHours(23,59,59,999);

        const alreadyMarked =
        await Attendance.findOne({

            user:userId,

        date:{
            $gte:startOfDay,
            $lte:endOfDay
        }

});
        if(alreadyMarked){
            return res.status(400).json({
                message:"Attendance already marked today"
            });
        }

        // create attendance
        const attendance = await Attendance.create({
            user:userId,
            method:method || "WiFi",
            checkIn:new Date()
        });

        res.status(200).json({
            message:"Attendance marked",
            attendance
        });

    }catch(error){
        res.status(500).json({
            error:error.message
        });
    }
}

exports.getAttendanceHistory =
async(req,res)=>{

    try{

        const history =
        await Attendance.find({
            user:req.user.id
        });

        res.json(history);

    }
    catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};

exports.autoMarkAttendance =
async(req,res)=>{

    try{

        const userId =
        req.user.id;

        const {
            latitude,
            longitude
        } = req.body;

        const distance =
        geolib.getDistance(

            {
                latitude,
                longitude
            },

            {
                latitude:
                gymLocation.latitude,

                longitude:
                gymLocation.longitude
            }

        );

        if(
            distance >
            gymLocation.allowedRadius
        ){

            return res.status(400)
            .json({

                message:
                "You are not inside the gym"

            });

        }

        const attendance =
        await Attendance.create({

            user:userId,

            method:"WiFi",

            checkIn:new Date()

        });

        res.json({

            message:
            "Attendance marked automatically",

            distance

        });

    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

};

exports.getAttendanceStats = async(req,res)=>{

    try{

        const totalAttendance =
        await Attendance.countDocuments({

            user:req.user.id

        });

        res.json({

            totalAttendance

        });

    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

};