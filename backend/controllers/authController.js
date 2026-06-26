const User =  require("../models/user");
const jwt =  require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Subscription = require("../models/subscription");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

exports.signup = async(req,res)=>{

try{
const {name,email,password} = req.body;

const userExists = await User.findOne({email});

if(userExists){

return res.status(400).json({message:"User already exists"});

}

const hashedPassword = await bcrypt.hash(password,10);

const user = new User({name,email,password:hashedPassword});

await user.save();

const endDate = new Date();

endDate.setMonth(
    endDate.getMonth() + 1
);

await Subscription.create({

    user:user._id,

    plan:"Monthly",

    price:499,

    startDate:new Date(),

    endDate,

    status:"Active",

    paymentStatus:"Pending"

});

res.status(201).json({ success:true, message:"User registered successfully",

user:{
id:user._id,
name:user.name,
email:user.email,
}

});

}
catch(error){

res.status(500).json({ error:error.message});
}

};

exports.login = async(req,res)=>{

try{

const {email,password} = req.body;

const user = await User.findOne({email});

if(!user){

return res.status(400).json({

message:"User not found"

});

}

const match =
await bcrypt.compare(password,user.password);

if(!match){

return res.status(400).json({

message:"Invalid password"

});

}

const token = jwt.sign(

{
id:user._id,
role:user.role
},

process.env.JWT_SECRET,

{expiresIn:"7d"}

);

res.json({

success:true,

token,

user:{

id:user._id,

name:user.name,
email:user.email,
role:user.role

}

});

}
catch(error){

res.status(500).json({

error:error.message

});

}

};

exports.getUser = async(req,res)=>{

try{

const user = await User.findById(req.user.id).select("-password");

res.json(user);

}
catch(error){
res.status(500).json({error:error.message});
}

};

exports.getUser = async(req,res)=>{

    try{

        const user = await User.findById(req.user.id)
        .select("-password");

        res.json(user);

    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};

exports.getProfile = async(req,res)=>{

    try{

        const user =
        await User.findById(
            req.user.id
        ).select("-password");

        res.json(user);

    }
    catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};

exports.updateProfile = async(req,res)=>{

    try{

        const {
            name
        } = req.body;

        const user =
        await User.findByIdAndUpdate(

            req.user.id,

            {
                name
            },

            {
                new:true
            }

        ).select("-password");

        res.json(user);

    }
    catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};

exports.forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");

        // Hash token before saving
        user.resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

        await user.save();

        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        const message = `
            <h2>Smart Gym Password Reset</h2>
            <p>You requested to reset your password.</p>
            <a href="${resetUrl}">Reset Password</a>
            <p>This link expires in 15 minutes.</p>
        `;

        await sendEmail({

            email: user.email,

            subject: "Password Reset Request",

            message

        });

        res.status(200).json({

            message: "Password reset email sent successfully."

        });

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

};

exports.resetPassword = async (req, res) => {

    try {

        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const user = await User.findOne({

            resetPasswordToken,

            resetPasswordExpire: {
                $gt: Date.now()
            }

        });

        if (!user) {

            return res.status(400).json({

                message: "Invalid or Expired Token"

            });

        }

        const {

            password,
            confirmPassword

        } = req.body;

        if (password !== confirmPassword) {

            return res.status(400).json({

                message: "Passwords do not match"

            });

        }

        user.password = await bcrypt.hash(password, 10);

        user.resetPasswordToken = undefined;

        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({

            success: true,

            message: "Password Reset Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

};