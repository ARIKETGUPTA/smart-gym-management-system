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
            "Cash",
            "UPI",
            "Card"
        ],
        required:true
    },

    status:{
        type:String,
        enum:[
            "Paid",
            "Pending"
        ],
        default:"Paid"
    },

    paymentDate:{
        type:Date,
        default:Date.now
    }

},{
    timestamps:true
});

module.exports =
mongoose.model(
    "Payment",
    paymentSchema
);