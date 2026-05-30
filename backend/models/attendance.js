const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    date:{
        type:Date,
        default:Date.now
    },

    checkIn:{
        type:Date
    },

    checkOut:{
        type:Date
    },

    method:{
        type:String,
        enum:["WiFi","Manual","QR"],
        default:"Manual"
    },

    status:{
        type:String,
        enum:["Present","Absent"],
        default:"Present"
    }

},{timestamps:true});

module.exports = mongoose.model("Attendance",attendanceSchema);