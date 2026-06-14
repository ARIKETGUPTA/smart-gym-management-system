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
async function loadRevenueStats(){

    const token =
    localStorage.getItem("token");

    const response =
    await fetch(

        "http://localhost:5000/admin/revenue-stats",

        {

            headers:{

                Authorization:
                `Bearer ${token}`

            }

        }

    );

    const data =
    await response.json();

    document.getElementById(
        "totalRevenue"
    ).innerText =
    "₹" + data.totalRevenue;

    document.getElementById(
        "monthlyRevenue"
    ).innerText =
    "₹" + data.monthlyRevenue;

    document.getElementById(
        "todayRevenue"
    ).innerText =
    "₹" + data.todayRevenue;

    document.getElementById(
        "totalPayments"
    ).innerText =
    data.totalPayments;

}

loadRevenueStats();

const ctx =
document.getElementById("revenueChart");

new Chart(ctx,{

    type:"bar",

    data:{

        labels:[
            "Today Revenue",
            "Monthly Revenue",
            "Total Revenue"
        ],

        datasets:[{

            label:"Revenue",

            data:[

                data.todayRevenue,

                data.monthlyRevenue,

                data.totalRevenue

            ]

        }]

    }

});