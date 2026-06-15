const token =
localStorage.getItem("token");

if(!token){

    window.location.href = "/";

}

// Load Profile

fetch(
    "/auth/profile",
    {
        headers:{
            Authorization:
            `Bearer ${token}`
        }
    }
)
.then(res=>res.json())
.then(data=>{

    // Form Fields
    document.getElementById("avatarLetter").innerText = data.name.charAt(0).toUpperCase();

    document.getElementById("name")
    .value =
    data.name;

    document.getElementById("email")
    .value =
    data.email;

    // Profile Card

    document.getElementById(
        "profileName"
    ).innerText =
    data.name;

    document.getElementById(
        "profileEmail"
    ).innerText =
    data.email;

})
.catch(error=>{

    console.log(error);

});

// Attendance Stats

fetch(
    "/attendance/stats",
    {
        headers:{
            Authorization:
            `Bearer ${token}`
        }
    }
)
.then(res=>res.json())
.then(data=>{

    document.getElementById(
        "attendanceCount"
    ).innerText =

    data.totalAttendance;

})
.catch(error=>{

    console.log(error);

});

// Subscription Info

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

    document.getElementById(
        "subscriptionPlan"
    ).innerText =

    data.subscription.plan;

})
.catch(error=>{

    console.log(error);

});

// Update Profile

async function updateProfile(){

    const name =
    document.getElementById(
        "name"
    ).value;

    try{

        const response =
        await fetch(

            "/auth/profile",

            {

                method:"PUT",

                headers:{

                    "Content-Type":
                    "application/json",

                    Authorization:
                    `Bearer ${token}`

                },

                body:JSON.stringify({

                    name

                })

            }

        );

        const data =
        await response.json();

        alert(
            "✅ Profile Updated"
        );

        document.getElementById(
            "profileName"
        ).innerText =
        name;

    }
    catch(error){

        console.log(error);

    }

}

// Navigation

function logout(){

    localStorage.removeItem(
        "token"
    );

    window.location.href =
    "/";

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