const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true
    },

    phone:{
        type:String,
       // required:true
    },

    password:{
    type:String,
    required:true,
    minlength:6
    },

    membershipType:{
        type:String,
        enum:["Monthly","Quarterly","Yearly"],
        default:"Monthly"
    },

    membershipStart:{
        type:Date,
        default:Date.now
    },

    membershipEnd:{
        type:Date,
       // required:true
    },

    paymentStatus:{
        type:String,
        enum:["Paid","Pending"],
        default:"Pending"
    },

    attendance:[
        {
            date:{
                type:Date,
                default:Date.now
            },
            status:{
                type:String,
                default:"Present"
            }
        }
    ],

    role:{
        type:String,
        enum:["User","Admin"],
        default:"User"
    }

},{timestamps:true});

module.exports = mongoose.model("User",userSchema); 