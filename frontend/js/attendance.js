const token = localStorage.getItem("token");

fetch(
    "/attendance/history",
    {
        headers:{
            Authorization:
            `Bearer ${token}`
        }
    }
)
.then(res=>res.json())
.then(data=>{

    const tbody =
    document.querySelector("tbody");

    data.forEach(item=>{

        const row =
        document.createElement("tr");

        row.innerHTML = `

        <td>
        ${
        new Date(
        item.date
        ).toLocaleDateString()
        }
        </td>

        <td>
        ${item.checkIn}
        </td>

        <td>
        ${item.method}
        </td>

        <td>
        ${item.status}
        </td>

        `;

        tbody.appendChild(row);

    });

});