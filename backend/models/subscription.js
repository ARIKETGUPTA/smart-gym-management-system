const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },

    plan:{
        type:String,
        enum:["Monthly","Quarterly","Yearly"],
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    startDate:{
        type:Date,
        default:Date.now
    },

    endDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:["Active","Expired"],
        default:"Active"
    },
    paymentStatus:{
        type:String,
        enum:["Paid","Pending"],
        default:"Pending"
    }

},{timestamps:true});

module.exports = mongoose.model("Subscription",subscriptionSchema);