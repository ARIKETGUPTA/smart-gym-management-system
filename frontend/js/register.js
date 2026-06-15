async function register(){

    const name =
    document.getElementById(
        "name"
    ).value;

    const email =
    document.getElementById(
        "email"
    ).value;

    const password =
    document.getElementById(
        "password"
    ).value;

    const membershipType =
    document.getElementById(
        "membershipType"
    ).value;

    const response =
    await fetch(

        "http://localhost:5000/auth/signup",

        {

            method:"POST",

            headers:{

                "Content-Type":
                "application/json"

            },

            body:JSON.stringify({

                name,
                email,
                password,
                membershipType

            })

        }

    );

    const data =
    await response.json();

    alert(data.message);

    if(response.ok){

        window.location.href =
        "/";

    }

}