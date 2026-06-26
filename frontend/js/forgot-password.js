const form = document.getElementById("forgotForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
    document.getElementById("email").value;

    const response = await fetch(

        "/auth/forgot-password",

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                email

            })

        }

    );

    const data = await response.json();

    const message =
    document.getElementById("message");

    if(response.ok){

        message.style.color = "green";

    }

    else{

        message.style.color = "red";

    }

    message.innerText =
    data.message || data.error;

});