const token = localStorage.getItem("token");

fetch(
    "/attendance/history",
    {
        headers:{
            Authorization:
            `Bearer ${token}`
        }
    }
)
.then(res=>res.json())
.then(data=>{

    const tbody =
    document.querySelector("tbody");

    data.forEach(item=>{

        const row =
        document.createElement("tr");

        row.innerHTML = `

        <td>
        ${
        new Date(
        item.date
        ).toLocaleDateString()
        }
        </td>

        <td>
        ${item.checkIn}
        </td>

        <td>
        ${item.method}
        </td>

        <td>
        ${item.status}
        </td>

        `;

        tbody.appendChild(row);

    });

});

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

    const ctx =
    document.getElementById(
        "attendanceChart"
    );

    new Chart(ctx,{

        type:"bar",

        data:{

            labels:[
                "Attendance"
            ],

            datasets:[{

                label:
                "Total Attendance",

                data:[
                    data.totalAttendance
                ]

            }]

        }

    });

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