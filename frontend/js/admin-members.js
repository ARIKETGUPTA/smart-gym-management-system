const token = localStorage.getItem("token");
console.log(token);
fetch("/admin/members",{
    headers:{
        Authorization:`Bearer ${token}`
    }
})
.then(res=>res.json())
.then(data=>{

    console.log("Members Data:", data);

    const table = document.getElementById("membersTable");

    data.forEach(user=>{

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${user.name}</td>

            <td>${user.email}</td>

            <td>${user.role}</td>

            <td>${user.membershipType}</td>

            <td>${user.paymentStatus}</td>

        <td>

        <button
        onclick="editMember('${user._id}')">

        Edit

        </button>

        <button
        onclick="deleteMember('${user._id}')">

        Delete

        </button>

        </td>`;
        table.appendChild(row);

    });

})
.catch(err=>{
    console.log(err);
});

async function deleteMember(id){

    const token =
    localStorage.getItem("token");

    const response =
    await fetch(

        `/admin/member/${id}`,

        {

            method:"DELETE",

            headers:{
                Authorization:
                `Bearer ${token}`
            }

        }

    );

}

async function editMember(id){

    const name = prompt("Enter new name");

    if(!name){

        return;

    }

    const token = localStorage.getItem("token");

    const response = await fetch(

        `/admin/member/${id}`,

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

    const data = await response.json();

    alert(data.message);

    location.reload();

}

async function searchMembers(){

    const search =
    document.getElementById("search").value;

    const token =
    localStorage.getItem("token");

    const response =
    await fetch(

        `/admin/members?search=${search}`,

        {

            headers:{

                Authorization:
                `Bearer ${token}`

            }

        }

    );

    const data =
    await response.json();

    console.log(data);

}

exports.getRevenue = async(req,res)=>{

    try{

        const subscriptions =
        await Subscription.find({

            paymentStatus:"Paid"

        });

        const revenue =
        subscriptions.reduce(

            (sum,item)=>

            sum + item.price,

            0

        );

        res.json({

            totalRevenue:revenue

        });

    }
    catch(error){

        res.status(500).json({

            error:error.message

        });

    }

};

exports.updateExpiredSubscriptions =
async()=>{

    await Subscription.updateMany(

        {
            endDate:{
                $lt:new Date()
            }
        },

        {
            status:"Expired"
        }

    );

};