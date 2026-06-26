const form = document.getElementById("resetForm");

const token =
window.location.pathname.split("/").pop();

form.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const password =
    document.getElementById("password").value;

    const confirmPassword =
    document.getElementById("confirmPassword").value;

    const response = await fetch(

        `/auth/reset-password/${token}`,

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                password,

                confirmPassword

            })

        }

    );

    const data =
    await response.json();

    const message =
    document.getElementById("message");

    if(response.ok){

        message.style.color="green";

        message.innerHTML=data.message;

        setTimeout(()=>{

            window.location.href="/";

        },2000);

    }

    else{

        message.style.color="red";

        message.innerHTML=data.message || data.error;

    }

});