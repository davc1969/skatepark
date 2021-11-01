//const { default: axios } = require("axios");


document.getElementById("submitSkater").addEventListener("click", async (event) => {
    event.preventDefault();

    const sktEmail = document.getElementById("skaterEmail").value;
    const sktName = document.getElementById("skaterName").value;
    const sktPass1 = document.getElementById("skaterPassword1").value;
    const sktPass2 = document.getElementById("skaterPassword2").value;
    const sktExperience = document.getElementById("skaterXp").value;
    const sktHability = document.getElementById("skaterHability").value;
    const sktPic = document.getElementById("skaterPic");

    if (sktPass1 === sktPass2){
        try {
            const formData = new FormData();
            formData.append("skaterPic", sktPic.files[0]);
            const respPic = await fetch("/api/skater/pic/" + sktEmail, {
                method: "post",
                body: formData
            });
            const dataPic = await respPic.json();

            const response = await fetch("/api/skater/new", {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "email": sktEmail,
                    "nombre": sktName,
                    "password": sktPass1,
                    "anos_experiencia": sktExperience,
                    "especialidad": sktHability,
                    "foto": dataPic[0],
                    "estado": false
                })
            });
            const data = await response.json();
            console.log("register system: ", data);
            if (data.error == "23505") {
                alert("Correo ya fue registrado.  No es posible continuar")
            }
        } catch (error) {
            console.error("hubo un error en el register", error)
            console.log("error code ", error.code);
        } finally {
            console.log("register finally");
            location.href = "/"
        }
    }
})



