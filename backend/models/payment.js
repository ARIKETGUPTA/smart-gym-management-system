const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    amount:{
        type:Number,
        required:true
    },

    paymentMethod:{
        type:String,
        enum:[
            "UPI",
            "Card",
            "NetBanking",
            "Wallet",
            "Cash"
        ],
        required:true
    },

    paymentGateway:{
        type:String,
        enum:[
            "Razorpay",
            "Cash"
        ],
        default:"Razorpay"
    },

    transactionId:{
        type:String
    },

    orderId:{
        type:String
    },

    status:{
        type:String,
        enum:[
            "Pending",
            "Paid",
            "Failed"
        ],
        default:"Pending"
    },

    paymentDate:{
        type:Date,
        default:Date.now
    }

},{timestamps:true});

module.exports =
mongoose.model("Payment",paymentSchema);