const token = localStorage.getItem("token");

// Load all members on page load

fetch("/admin/members", {

    headers: {
        Authorization: `Bearer ${token}`
    }

})

.then(res => res.json())

.then(data => {

    console.log("Members Data:", data);

    renderMembers(data);

})

.catch(err => {

    console.log(err);

});

// Render Members

function renderMembers(data) {

    const table =
    document.getElementById("membersTable");

    table.innerHTML = "";

    data.forEach(user => {

        const row =
        document.createElement("tr");

        row.innerHTML = `

            <td>${user.name}</td>

            <td>${user.email}</td>

            <td>${user.role}</td>

            <td>${user.membershipType || "-"}</td>

            <td>${user.paymentStatus || "-"}</td>

            <td>

            <button
            onclick="viewMember('${user._id}')">

            View

        </button>

        <button
        onclick="editMember('${user._id}')">

        Edit

        </button>

        <button
        onclick="deleteMember('${user._id}')">

        Delete

        </button>

    </td>

        `;

        table.appendChild(row);

    });

}

// Search Members

async function searchMembers() {

    const search =
    document.getElementById("search").value;

    const response =
    await fetch(

        `/admin/members?search=${search}`,

        {

            headers: {

                Authorization:
                `Bearer ${token}`

            }

        }

    );

    const data =
    await response.json();

    renderMembers(data);

}

// Delete Member

async function deleteMember(id) {

    const response =
    await fetch(

        `/admin/member/${id}`,

        {

            method: "DELETE",

            headers: {

                Authorization:
                `Bearer ${token}`

            }

        }

    );

    const data =
    await response.json();

    alert(data.message);

    location.reload();

}

// Edit Member

async function editMember(id) {

    const name =
    prompt("Enter new name");

    if (!name) {

        return;

    }

    const response =
    await fetch(

        `/admin/member/${id}`,

        {

            method: "PUT",

            headers: {

                "Content-Type":
                "application/json",

                Authorization:
                `Bearer ${token}`

            },

            body: JSON.stringify({

                name

            })

        }

    );

    const data =
    await response.json();

    alert(data.message);

    location.reload();

}

let selectedMemberId = null;

async function viewMember(id){

    const response =
    await fetch(

        `/admin/member/${id}`,

        {

            headers:{

                Authorization:
                `Bearer ${token}`

            }

        }

    );

    const data =
    await response.json();

    selectedMemberId = id;

    document.getElementById(
        "modalName"
    ).innerText =
    data.user.name;

    document.getElementById(
        "modalEmail"
    ).innerText =
    data.user.email;

    document.getElementById(
        "modalRole"
    ).innerText =
    data.user.role;

    document.getElementById(
        "modalAttendance"
    ).innerText =
    data.attendanceCount;

    document.getElementById(
        "modalSubscriptionStatus"
    ).innerText =
    data.subscription?.status ||
    "No Subscription";

    document.getElementById(
        "modalPlan"
    ).value =
    data.subscription?.plan ||
    "Monthly";

    document.getElementById(
        "modalPayment"
    ).value =
    data.subscription?.paymentStatus ||
    "Pending";

    document.getElementById(
        "memberModal"
    ).style.display =
    "block";

}

async function updateMemberDetails(){
    

    const membershipType =
    document.getElementById(
        "modalPlan"
    ).value;

    const paymentStatus =
    document.getElementById(
        "modalPayment"
    ).value;

    const response =
    await fetch(

        `/admin/member/${selectedMemberId}`,

        {

            method:"PUT",

            headers:{

                "Content-Type":
                "application/json",

                Authorization:
                `Bearer ${token}`

            },

            body:JSON.stringify({

                membershipType,

                paymentStatus

            })

        }

    );

    const data = await response.json();
    console.log(
    "Sending:",
    membershipType,
    paymentStatus
);
    console.log(data);
    alert(data.message);

    closeModal();

    location.reload();

}

function closeModal(){

    document.getElementById(
        "memberModal"
    ).style.display =
    "none";

}

function goToDashboard(){

    window.location.href =
    "/admin-dashboard-page";

}

function goToMembers(){

    window.location.href =
    "/admin-members-page";

}

function logout(){

    localStorage.removeItem(
        "token"
    );

    window.location.href =
    "/";

}