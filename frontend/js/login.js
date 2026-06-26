async function login(){

    const email = document.getElementById("email").value;
    
    const password = document.getElementById("password").value;
    
    const response =
    await fetch(
        "/auth/login",
        {
            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify({
                email,
                password
            })
        }
    );

    const data = await response.json();

    if(data.token){
        
        localStorage.setItem(  "token", data.token );
        localStorage.setItem("role", data.user.role);

    if(data.user.role === "User"){   
        window.location.href = "/dashboard-page";
    }else {window.location.href = "/admin-dashboard-page";}

    }else{

        alert("Login Failed");

    }

}