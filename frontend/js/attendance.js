const token = localStorage.getItem("token");

if(!token){

    window.location.href = "/";

}

// Load Attendance History
fetch(
    "/attendance/history",
    {
        headers:{
            Authorization:
            `Bearer ${token}`
        }
    }
)
.then(res => res.json())
.then(data => {

    const tbody =
    document.querySelector(
        "#attendanceTable tbody"
    );

    tbody.innerHTML = "";

    if(data.length === 0){

        tbody.innerHTML = `

            <tr>

                <td colspan="4">

                    No attendance records found

                </td>

            </tr>

        `;

        return;

    }

    data.forEach(item => {

        const row =
        document.createElement("tr");

        row.innerHTML = `

            <td>

                ${new Date(
                    item.checkIn
                ).toLocaleDateString()}

            </td>

            <td>

                ${new Date(
                    item.checkIn
                ).toLocaleTimeString(
                    [],
                    {
                        hour:"2-digit",
                        minute:"2-digit"
                    }
                )}

            </td>

            <td>

                ${item.method}

            </td>

            <td>

                <span class="present">

                    Present

                </span>

            </td>

        `;

        tbody.appendChild(row);

    });

})
.catch(error => {

    console.log(error);

});

// Attendance Chart
// fetch(
//     "/attendance/stats",
//     {
//         headers:{
//             Authorization:
//             `Bearer ${token}`
//         }
//     }
// )
// .then(res => res.json())
// .then(data => {

//     const ctx =
//     document.getElementById(
//         "attendanceChart"
//     );

//     new Chart(ctx,{

//         type:"bar",

//         data:{

//             labels:[

//                 "Present Days"

//             ],

//             datasets:[{

//                 label:
//                 "Attendance Count",

//                 data:[

//                     data.totalAttendance

//                 ]

//             }]

//         },

//         options:{

//             responsive:true,

//             maintainAspectRatio:false

//         }

//     });

// })
// .catch(error => {

//     console.log(error);

// });

// Attendance Summary
fetch(
    "/attendance/dashboard-stats",
    {
        headers:{
            Authorization:
            `Bearer ${token}`
        }
    }
)
.then(res => res.json())
.then(data => {

    const attendancePercentage =
    document.getElementById(
        "attendancePercentage"
    );

    const presentDays =
    document.getElementById(
        "presentDays"
    );

    const missedDays =
    document.getElementById(
        "missedDays"
    );

    const streakDays =
    document.getElementById(
        "streakDays"
    );

    if(attendancePercentage){

        attendancePercentage.innerText =
        data.attendanceRate + "%";

    }

    if(presentDays){

        presentDays.innerText =
        data.presentDays;

    }

    if(missedDays){

        missedDays.innerText =
        data.missedDays;

    }

    if(streakDays){

        streakDays.innerText =
        data.streak;

    }

})
.catch(error => {

    console.log(error);

});

// Navigation Functions

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