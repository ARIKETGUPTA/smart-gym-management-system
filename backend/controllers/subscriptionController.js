const Subscription = require("../models/subscription");

exports.createSubscription = async(req,res)=>{

    try{

        const { user, plan, price } = req.body;

        const startDate = new Date();

        const endDate = new Date();

        if(plan === "Monthly"){

            endDate.setMonth( endDate.getMonth()+1 );

        }
        else if(plan === "Quarterly"){

            endDate.setMonth( endDate.getMonth()+3 );

        }
        else{

            endDate.setFullYear(endDate.getFullYear()+1 );

        }

        const subscription =
        await Subscription.create({user, plan, price, startDate, endDate });

        res.status(201).json({ message: "Subscription created", subscription });

    }
    catch(error){

        res.status(500).json({error:error.message });

    }

};

exports.getMySubscription = async(req,res)=>{

    try{

        const subscription = await Subscription.findOne({user:req.user.id });

        if(!subscription){

            return res.status(404).json({ message: "No subscription found" });

        }

        const today = new Date();

        const daysRemaining = Math.ceil(

            (subscription.endDate - today) / (1000*60*60*24) );

        res.json({subscription, daysRemaining });

    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

};