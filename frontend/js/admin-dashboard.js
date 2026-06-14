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

    const ctx =
    document.getElementById(
        "revenueChart"
    );

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

}

loadRevenueStats();

async function loadAttendanceStats(){

    const token =
    localStorage.getItem(
        "token"
    );

    const response =
    await fetch(

        "http://localhost:5000/admin/attendance-stats",

        {

            headers:{

                Authorization:
                `Bearer ${token}`

            }

        }

    );

    const data =
    await response.json();

    document
    .getElementById(
        "todayAttendanceCard"
    )
    .innerText =
    data.todayAttendance;

    document
    .getElementById(
        "weeklyAttendanceCard"
    )
    .innerText =
    data.weeklyAttendance;

    document
    .getElementById(
        "monthlyAttendanceCard"
    )
    .innerText =
    data.monthlyAttendance;

}

loadAttendanceStats();

async function loadTopMembers(){

    const token =
    localStorage.getItem("token");

    const response =
    await fetch(

        "http://localhost:5000/admin/top-members",

        {

            headers:{

                Authorization:
                `Bearer ${token}`

            }

        }

    );

    const data =
    await response.json();

    const table =
    document.getElementById(
        "topMembersTable"
    );

    table.innerHTML = "";

    data.forEach(member=>{

        const row =
        document.createElement("tr");

        row.innerHTML = `

            <td>${member._id.name}</td>

            <td>${member._id.email}</td>

            <td>${member.attendanceCount}</td>

        `;

        table.appendChild(row);

    });

}

loadTopMembers();