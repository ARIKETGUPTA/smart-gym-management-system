const token =
localStorage.getItem("token");

async function makePayment(){

    const amount =
    document.getElementById(
        "amount"
    ).value;

    const paymentMethod =
    document.getElementById(
        "paymentMethod"
    ).value;

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

    alert(data.message);

    loadPayments();

}

async function loadPayments(){

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

    payments.forEach(payment=>{

        const row =
        document.createElement("tr");

        row.innerHTML = `

        <td>${payment.amount}</td>

        <td>${payment.paymentMethod}</td>

        <td>${payment.status}</td>

        <td>
        ${new Date(
            payment.paymentDate
        ).toLocaleDateString()}
        </td>

        `;

        table.appendChild(row);

    });

}

loadPayments();