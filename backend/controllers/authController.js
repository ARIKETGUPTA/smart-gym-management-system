const User =  require("../models/user");
const jwt =  require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
// console.log(process.env.JWT_SECRET);
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
email:user.email

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