const token =
localStorage.getItem("token");

if(!token){

    window.location.href = "/";

}

// Create Payment

async function makePayment(){

    const amount =
    document.getElementById(
        "amount"
    ).value;

    const paymentMethod =
    document.getElementById(
        "paymentMethod"
    ).value;

    if(!amount){

        alert(
            "Please enter amount"
        );

        return;

    }

    try{

        const response =
        await fetch(

            "http://localhost:5000/payment/create",

            {

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json",

                    Authorization:
                    `Bearer ${token}`

                },

                body:JSON.stringify({

                    amount,
                    paymentMethod

                })

            }

        );

        const data =
        await response.json();

        alert(
            data.message
        );

        document.getElementById(
            "amount"
        ).value = "";

        loadPayments();

    }
    catch(error){

        console.log(error);

    }

}

// Load Payment History

async function loadPayments(){

    try{

        const response =
        await fetch(

            "http://localhost:5000/payment/history",

            {

                headers:{

                    Authorization:
                    `Bearer ${token}`

                }

            }

        );

        const payments =
        await response.json();

        const table =
        document.getElementById(
            "paymentTable"
        );

        table.innerHTML = "";

        let totalPaid = 0;

        if(payments.length === 0){

            table.innerHTML = `

            <tr>

                <td colspan="4">

                    No payments found

                </td>

            </tr>

            `;

            return;

        }

        payments.forEach(payment=>{

            totalPaid +=
            Number(
                payment.amount
            );

            const row =
            document.createElement(
                "tr"
            );

            row.innerHTML = `

                <td>₹${payment.amount}</td>

                <td>${payment.paymentMethod}</td>

                <td>${payment.paymentGateway}</td>

                <td>${payment.status}</td>

                <td>${payment.transactionId}</td>

                <td>${new Date(payment.paymentDate).toLocaleDateString()}</td>

            `;

            table.appendChild(
                row
            );

        });

        document.getElementById(
            "totalPaid"
        ).innerText =
        totalPaid;

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

function goToDashboard(){

    window.location.href =
    "/dashboard-page";

}

function goToAttendance(){

    window.location.href =
    "/attendance-page";

}

function goToSubscription(){

    window.location.href =
    "/subscription-page";

}

function goToPayment(){

    window.location.href =
    "/payment-page";

}

function goToProfile(){

    window.location.href =
    "/profile-page";

}

loadPayments();