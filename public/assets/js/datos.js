
const btnDelete = document.getElementById("btn_deleteAccount");
btnDelete.addEventListener("click", async (event) => {
    event.preventDefault();

    const id = btnDelete.getAttribute("data-idSkater");
    console.log("id : ", id);
    if (confirm("está seguro de querer borrar su registro?")) {
        console.log("a borrar");
        const urlSkater = `/api/skater/${id}`;
        console.log(urlSkater);
        try {
            const response = await fetch(urlSkater, {
                method: "delete"
            });
            const data = await response.json();
        } catch (error) {
            console.error(error)
        } finally {
            location.href = "/"
        }
    } else {
        console.log("se salvo");
    }
});


const btnUpdate = document.getElementById("btn_updateAccount");
btnUpdate.addEventListener("click", async (event) => {
    event.preventDefault();

    const sktName = document.getElementById("skaterNewName").value;
    const sktPass1 = document.getElementById("skaterNewPassword1").value;
    const sktPass2 = document.getElementById("skaterNewPassword2").value;
    const sktExperience = document.getElementById("skaterNewExperience").value;
    const sktHability = document.getElementById("skaterNewHability").value;
 

    const id = btnUpdate.getAttribute("data-idSkater");
    if (confirm("está seguro de querer actualizar su registro?")) {
        if (sktPass1 === sktPass2) {
            const urlSkater = `/api/skater/${id}`;
            try {
                const response = await fetch(urlSkater, {
                    method: "put",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "nombre": sktName,
                        "password": sktPass1,
                        "anos_experiencia": sktExperience,
                        "especialidad": sktHability,
                        "estado": false  //Cada edición debe ser autorizada
                    })
                });
                const data = await response.json();
            } catch (error) {
                console.error(error)
            } finally {
                location.href = "/"
            }
        } else {
            alert("El password debe ser igual en ambas casillas")
        }
        
    } else {
        console.log("No se actualizó");
    }
})