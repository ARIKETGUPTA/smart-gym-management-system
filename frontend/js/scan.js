function onScanSuccess(decodedText){

    const token =
    localStorage.getItem(
        "token"
    );

    fetch(

        "/attendance/scan",

        {

            method:"POST",

            headers:{

                "Content-Type":
                "application/json",

                Authorization:
                `Bearer ${token}`

            },

            body:JSON.stringify({

                qrData:
                decodedText

            })

        }

    )

    .then(res=>res.json())

   .then(data=>{

    if(

        data.message ===

        "Attendance Marked Successfully"

    ){

        document.getElementById(

            "reader"

        ).style.display =

        "none";

        document.getElementById(

            "successMessage"

        ).style.display =

        "block";

        setTimeout(()=>{

            window.location.href =

            "/attendance-page";

        },2000);

    }

    else{

        alert(data.message);

    }

});

}

const scanner =
new Html5QrcodeScanner(

    "reader",

    {

        fps:10,

        qrbox:250

    }

);

scanner.render(
    onScanSuccess
);