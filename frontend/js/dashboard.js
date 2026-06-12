const token = localStorage.getItem("token");

if(!token){

    window.location.href="/";

}

fetch("/dashboard",{
    headers:{
        Authorization:`Bearer ${token}`
    }
})
.then(res => res.json())
.then(data => {

    console.log(data);

    document.getElementById("name").innerText =
    data.name;

    document.getElementById("email").innerText =
    data.email;

    document.getElementById("membership").innerText =
    data.membership;

    document.getElementById("days").innerText =
    data.daysRemaining;

    document.getElementById("payment").innerText =
    data.paymentStatus;

    document.getElementById("attendance").innerText =
    data.attendanceCount;

    if(data.subscription.paymentStatus=== "Pending"){
    document.getElementById("payment").style.color = "orange";
    }

    if(data.subscription.paymentStatus === "Pending"){
    document.getElementById("payment").style.color = "orange";
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

async function markAttendance(){

    const token =
    localStorage.getItem("token");

    try{

        const response =
        await fetch(

            "/attendance/auto-mark",

            {

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json",

                    Authorization:
                    `Bearer ${token}`

                },

                body:JSON.stringify({

                    latitude:26.4499,

                    longitude:80.3319

                })

            }

        );

        const data =
        await response.json();

        alert(data.message);

    }
    catch(error){

        console.log(error);

    }

}

document.getElementById("today") .innerText = new Date().toDateString();