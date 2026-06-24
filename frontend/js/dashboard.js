const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/";
}

// Load Dashboard Data
fetch("/dashboard", {
    headers: {
        Authorization: `Bearer ${token}`
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

    if (
        data.subscription &&
        data.subscription.paymentStatus === "Pending"
    ) {
        document.getElementById("payment").style.color =
        "orange";
    }

})
.catch(error => {
    console.log(error);
});

// Logout
function logout() {

    localStorage.removeItem("token");

    window.location.href = "/";
}

// Navigation
function goToAttendance() {
    window.location.href = "/attendance-page";
}

function goToSubscription() {
    window.location.href = "/subscription-page";
}

function goToProfile() {
    window.location.href = "/profile-page";
}

function goToDashboard() {
    window.location.href = "/dashboard-page";
}

function goToPayment(){

    window.location.href =
    "/payment-page";

}

// Mark Attendance
async function markAttendance() {

    try {

        const response =
        await fetch(

            "/attendance/auto-mark",

            {
                method: "POST",

                headers: {

                    "Content-Type":
                    "application/json",

                    Authorization:
                    `Bearer ${token}`

                },

                body: JSON.stringify({

                    latitude: 26.4499,

                    longitude: 80.3319

                })

            }

        );

        const data =
        await response.json();

        alert(data.message);

    }
    catch (error) {

        console.log(error);

    }

}

// Today's Date
document.getElementById("today").innerText =
new Date().toDateString();

// Weekly Attendance
async function loadWeeklyAttendance() {

    try {

        const response =
        await fetch(

            "http://localhost:5000/attendance/weekly",

            {

                headers: {

                    Authorization:
                    `Bearer ${token}`

                }

            }

        );

        const data =
        await response.json();

        const table =
        document.getElementById(
            "weeklyAttendanceTable"
        );

        if (!table) return;

        table.innerHTML = "";

        data.forEach(item => {

            const day =
            new Date(
                item.checkIn
            ).toLocaleDateString(

                "en-US",

                {
                    weekday: "short"
                }

            );

            const time =
            new Date(
                item.checkIn
            ).toLocaleTimeString(

                [],

                {

                    hour: "2-digit",

                    minute: "2-digit"

                }

            );

            const row =
            document.createElement("tr");

            row.innerHTML = `

                <td>${day}</td>

                <td>${time}</td>

                <td class="present">
                    Present
                </td>

            `;

            table.appendChild(row);

        });

    }
    catch(error){

        console.log(error);

    }

}

// Attendance Summary
async function loadAttendanceSummary() {

    try {

        const response =
        await fetch(

            "http://localhost:5000/attendance/dashboard-stats",

            {

                headers: {

                    Authorization:
                    `Bearer ${token}`

                }

            }

        );

        const data =
        await response.json();

        if(document.getElementById("attendanceRate"))
            document.getElementById("attendanceRate").innerText =
            data.attendanceRate + "%";

        if(document.getElementById("presentDays"))
            document.getElementById("presentDays").innerText =
            data.presentDays;

        if(document.getElementById("restDays"))
            document.getElementById("restDays").innerText =
            data.restDays;

        if(document.getElementById("missedDays"))
            document.getElementById("missedDays").innerText =
            data.missedDays;

        if(document.getElementById("streakDays"))
            document.getElementById("streakDays").innerText =
            data.streak;

    }
    catch(error){

        console.log(error);

    }

}

// Load Extra Dashboard Sections
loadWeeklyAttendance();
loadAttendanceSummary();

function goToQRScanner(){

    window.location.href =
    "/scan-page";

}