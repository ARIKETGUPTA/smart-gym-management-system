const Payment = require("../models/payment");
const Subscription = require("../models/subscription");
const razorpay = require("../config/razorpay");
// Create Payment
exports.createPayment = async(req,res)=>{

    try{

        const {
            amount,
            paymentMethod
        } = req.body;

        const payment = await Payment.create({

            user:req.user.id,

            amount,

            paymentMethod,

            status:"Paid"

        });

        const subscription = await Subscription.findOne({

    user: req.user.id

});

if(subscription){

    let endDate = subscription.endDate > new Date()?new Date(subscription.endDate):new Date();

    if( subscription.plan === "Monthly" ){

        endDate.setDate( endDate.getDate() + 30 );

    }
    else if(subscription.plan === "Yearly"){

        endDate.setMonth(endDate.getMonth() + 3 );

    }
    else if(subscription.plan === "Quarterly"){

        endDate.setFullYear(
            endDate.getFullYear() + 1
        );}

    await Subscription.findOneAndUpdate(

        {
            user: req.user.id
        },

        {

            paymentStatus: "Paid",

            status: "Active",

            startDate: new Date(),

            endDate

        }

    );
    res.status(201).json({

    message:
    "Payment recorded successfully",

    payment

});

}

    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

};

exports.getPaymentHistory =
async(req,res)=>{

    try{

        const payments =
        await Payment.find({ user:req.user.id }).sort({ paymentDate:-1 });

        res.json(payments);

    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

};

exports.createOrder = async(req,res)=>{

    try{

        const { plan } =
        req.body;

        let amount = 0;

        if(plan === "Monthly"){

            amount = 999;

        }
        else if(
            plan === "Quarterly"
        ){

            amount = 2499;

        }
        else if(
            plan === "Yearly"
        ){

            amount = 8999;

        }

        const options = {

            amount:
            amount * 100,

            currency:"INR",

            receipt:
            `receipt_${Date.now()}`

        };

        const order =
        await razorpay.orders.create(
            options
        );

        res.json(order);

    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

};