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

    const table =
    document.getElementById("membersTable");

    data.forEach(user=>{

        const row =
        document.createElement("tr");

        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
        `;

        table.appendChild(row);

    });

})
.catch(err=>{
    console.log(err);
});