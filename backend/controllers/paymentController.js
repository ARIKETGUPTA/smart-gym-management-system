const Payment = require("../models/payment");
const Subscription = require("../models/subscription");
const razorpay = require("../config/razorpay");
const crypto = require("crypto");
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

        endDate.setMonth(endDate.getFullYear() + 1 );

    }
    else if(subscription.plan === "Quarterly"){

        endDate.setFullYear(
            endDate.getMonth() + 3
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

exports.verifyPayment = async(req,res)=>{
        console.log("========== VERIFY PAYMENT ==========");
        console.log(req.body);
        console.log("Logged in User:", req.user);
    try{

        const {

            razorpay_order_id,

            razorpay_payment_id,

            razorpay_signature,

            plan

        } = req.body;

        const sign = crypto
        .createHmac(

            "sha256",

            process.env.RAZORPAY_KEY_SECRET

        )

        .update(

            razorpay_order_id +
            "|" +
            razorpay_payment_id

        )

        .digest("hex");

        if(sign !== razorpay_signature){

            return res.status(400).json({

                message:
                "Invalid Payment Signature"

            });

        }

        await Payment.create({

    user:req.user.id,

    amount:

        plan === "Monthly"
        ? 999
        : plan === "Quarterly"
        ? 2499
        : 8999,

    paymentMethod:"UPI",
    paymentGateway:"Razorpay",

    transactionId:
    razorpay_payment_id,

    orderId:
    razorpay_order_id,

    status:"Paid",

    paymentDate:new Date()

    });

    let days = 30;

if(plan === "Quarterly"){

    days = 90;

}
else if(plan === "Yearly"){

    days = 365;

}

const startDate =
new Date();

const endDate =
new Date();

endDate.setDate(

    endDate.getDate() + days

);

    let subscription =
await Subscription.findOne({

    user:req.user.id

});

if(subscription){

    subscription.plan = plan;

    subscription.price =
    plan === "Monthly"
    ? 999
    : plan === "Quarterly"
    ? 2499
    : 8999;

    subscription.startDate =
    startDate;

    subscription.endDate =
    endDate;

    subscription.status =
    "Active";

    subscription.paymentStatus =
    "Paid";

    await subscription.save();

}
else{

    await Subscription.create({

        user:req.user.id,

        plan,

        price:
        plan === "Monthly"
        ? 999
        : plan === "Quarterly"
        ? 2499
        : 8999,

        startDate,

        endDate,

        status:"Active",

        paymentStatus:"Paid"

    });

}

        // Payment verified

        res.json({

    success:true,

    message:
    "Payment Verified & Subscription Activated",

    plan,

    endDate

    });

    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

};

