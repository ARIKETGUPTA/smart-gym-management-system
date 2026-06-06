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

});

function logout(){

    localStorage.removeItem("token");

    window.location.href="/";

}

document.getElementById("today") .innerText = new Date().toDateString();