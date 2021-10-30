


document.getElementById("submitSkater").addEventListener("click", async (event) => {
    event.preventDefault();

    const sktEmail = document.getElementById("skaterEmail").value;
    const sktName = document.getElementById("skaterName").value;
    const sktPass1 = document.getElementById("skaterPassword1").value;
    const sktPass2 = document.getElementById("skaterPassword2").value;
    const sktExperience = document.getElementById("skaterXp").value;
    const sktHability = document.getElementById("skaterHability").value;
    const sktPic = document.getElementById("skaterPic").value;

    if (sktPass1 === sktPass2){
        try {
            const response = await fetch("/api/skater/new", {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "email": sktEmail,
                    "nombre": sktName,
                    "password": sktPass1,
                    "anos_experiencia": sktExperience,
                    "especialidad": sktHability,
                    "foto": sktPic,
                    "estado": false
                })
            });
            const data = await response.json();
            console.log("register system: ", data);
        } catch (error) {
            console.error(error)
        } finally {
            console.log("register finally");
            //location.href = "/"
        }
    }
})


