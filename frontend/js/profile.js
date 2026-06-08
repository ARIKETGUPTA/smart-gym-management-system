const token =
localStorage.getItem("token");

fetch(
    "/auth/profile",
    {
        headers:{
            Authorization:
            `Bearer ${token}`
        }
    }
)
.then(res=>res.json())
.then(data=>{

    document.getElementById("name")
    .value = data.name;

    document.getElementById("email")
    .value = data.email;

});

async function updateProfile(){

    const token =
    localStorage.getItem("token");

    const name =
    document.getElementById("name")
    .value;

    const response =
    await fetch(

        "/auth/profile",

        {

            method:"PUT",

            headers:{

                "Content-Type":
                "application/json",

                Authorization:
                `Bearer ${token}`

            },

            body:JSON.stringify({

                name

            })

        }

    );

    const data =
    await response.json();

    alert(
        "Profile Updated"
    );

}