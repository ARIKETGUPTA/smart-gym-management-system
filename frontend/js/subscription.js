const token = localStorage.getItem("token");

fetch(
    "/subscription/me",
    {
        headers:{
            Authorization:
            `Bearer ${token}`
        }
    }
)
.then(res=>res.json())
.then(data=>{

    document.getElementById("plan")
    .innerText =
    data.subscription.plan;

    document.getElementById("price")
    .innerText =
    data.subscription.price;

    document.getElementById("status")
    .innerText =
    data.subscription.status;

    document.getElementById("payment")
    .innerText =
    data.subscription.paymentStatus;

    document.getElementById("days")
    .innerText =
    data.daysRemaining;

    if(data.daysRemaining <= 5){

        const reminder =
        document.getElementById(
            "reminder"
        );

        reminder.style.display =
        "block";

        reminder.innerHTML =

        `⚠️ Your membership expires in
        ${data.daysRemaining} days`;

    }

});

function logout(){

    localStorage.removeItem("token");

    window.location.href="/";

}

function goToAttendance(){

    window.location.href =
    "/attendance-page";

}

function goToSubscription(){

   window.location.href ="/subscription-page";

}

function goToProfile(){

   window.location.href ="/profile-page";

}

function goToDashboard(){
    window.location.href ="/dashboard-page";
}