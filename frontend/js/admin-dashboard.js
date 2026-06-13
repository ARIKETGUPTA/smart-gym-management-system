const token = localStorage.getItem("token");

fetch(
    "/admin/stats",

    {

        headers:{

            Authorization: `Bearer ${token}`

        }

    }

)

.then(
    res=>res.json()
)

.then(data=>{

    document.getElementById("members").innerText = data.totalMembers;

    document.getElementById("subscriptions" ).innerText = data.activeSubscriptions;

    document.getElementById("revenue").innerText ="₹" +data.totalRevenue;

    document.getElementById("attendance" ).innerText  = data.todayAttendance;

});

