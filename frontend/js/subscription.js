const token = localStorage.getItem("token");

if(!token){

    window.location.href = "/";

}

fetch(
    "/subscription/me",
    {
        headers:{
            Authorization:
            `Bearer ${token}`
        }
    }
)
.then(res => res.json())
.then(data => {

    console.log(data);

    const subscription =
    data.subscription;

    document.getElementById("plan")
    .innerText =
    subscription.plan;

    document.getElementById("planName")
    .innerText =
    subscription.plan;

    document.getElementById("price")
    .innerText =
    subscription.price;

    document.getElementById("status")
    .innerText =
    subscription.status;

    document.getElementById("payment")
    .innerText =
    subscription.paymentStatus;

    document.getElementById("days")
    .innerText =
    data.daysRemaining;

    // Membership Progress

let totalDays = 30;

if(subscription.plan === "Quarterly"){

    totalDays = 90;

}
else if(subscription.plan === "Yearly"){

    totalDays = 365;

}

const usedDays =
totalDays - data.daysRemaining;

const progress =
Math.min(
    Math.round(
        (usedDays / totalDays) * 100
    ),
    100
);

document.getElementById(
    "progressFill"
).style.width =
progress + "%";

document.getElementById(
    "progressText"
).innerText =

`${usedDays} days used of ${totalDays} days (${progress}%)`;

    // Status Badge Styling

    const status =
    document.getElementById("status");

    if(
        subscription.status ===
        "Active"
    ){

        status.classList.add(
            "status-active"
        );

    }
    else{

        status.classList.add(
            "status-expired"
        );

    }

    // Payment Status Styling

    const payment =
    document.getElementById(
        "payment"
    );

    if(
        subscription.paymentStatus ===
        "Paid"
    ){

        payment.style.color =
        "#16a34a";

    }
    else{

        payment.style.color =
        "#d97706";

    }



    // Expiry Reminder

    const reminder =
    document.getElementById(
        "reminder"
    );

    if(
        data.daysRemaining <= 5 &&
        data.daysRemaining > 0
    ){

        reminder.style.display =
        "block";

        reminder.innerHTML =

        `⚠️ Your membership expires in
        ${data.daysRemaining} day(s).
        Please renew soon.`;

    }

    // Expired Membership

    if(
        data.daysRemaining <= 0
    ){

        reminder.style.display =
        "block";

        reminder.style.background =
        "#fee2e2";

        reminder.style.color =
        "#dc2626";

        reminder.innerHTML =

        `🚫 Membership Expired.
        Renew your subscription to
        continue accessing gym services.`;

    }

})
.catch(error => {

    console.log(error);

});

function logout(){

    localStorage.removeItem("token");

    window.location.href = "/";

}

function goToAttendance(){

    window.location.href =
    "/attendance-page";

}

function goToSubscription(){

    window.location.href =
    "/subscription-page";

}

function goToProfile(){

    window.location.href =
    "/profile-page";

}

function goToDashboard(){

    window.location.href =
    "/dashboard-page";

}

function goToPayment(){

    window.location.href =
    "/payment-page";

}