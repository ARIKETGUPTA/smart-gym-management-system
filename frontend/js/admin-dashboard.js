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

async function loadExpiryAlerts(){

    const response =
    await fetch(

        "/admin/expiry-alerts",

        {

            headers:{

                Authorization:
                `Bearer ${token}`

            }

        }

    );

    const alerts =
    await response.json();

    const table =
    document.getElementById(
        "expiryTable"
    );

    table.innerHTML = "";

    alerts.forEach(item=>{

        const row =
        document.createElement("tr");

        let badge =
        item.daysLeft <= 0

        ? "🔴 Expired"

        : `⚠ ${item.daysLeft} Days`;

        row.innerHTML = `

            <td>

                ${item.name}

            </td>

            <td>

                ${item.plan}

            </td>

            <td>

                ${badge}

            </td>

        `;

        table.appendChild(row);

    });

}

loadExpiryAlerts();

async function exportMembers(){

    const token =
    localStorage.getItem("token");

    const response =
    await fetch(

        "/admin/export-members",

        {

            headers:{

                Authorization:
                `Bearer ${token}`

            }

        }

    );

    const blob =
    await response.blob();

    const url =
    window.URL.createObjectURL(blob);

    const a =
    document.createElement("a");

    a.href = url;

    a.download =
    "members.csv";

    document.body.appendChild(a);

    a.click();

    a.remove();

}

async function loadNotifications(){

    const response =
    await fetch(

        "/admin/notifications",

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
        "notifications"
    ).innerHTML = `

        <div class="notification-item">

            ⚠ ${data.expiringCount}
            memberships expiring soon

        </div>

        <div class="notification-item">

            💳 ${data.pendingPayments}
            pending payments

        </div>

        <div class="notification-item">

            📅 ${data.absentToday}
            members absent today

        </div>

    `;

}

loadNotifications();

async function loadQR(){

    const response =
    await fetch(

        "/admin/generate-qr",

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
        "qrImage"
    ).src =
    data.qrImage;

}

loadQR();

function logout() {

    localStorage.removeItem("token");

    window.location.href = "/";
}

function goToMembers(){
    window.location.href = "/admin-members-page";
}