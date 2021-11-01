

const btnUpdateList = document.getElementById("btn_updateAccounts");
btnUpdateList.addEventListener("click", async (event) => {
    console.log("hicimos click en el boton actualizar");
    event.preventDefault();

    const estadosSkaters = document.querySelectorAll("[data-idSkater]");
    //console.log("estados ", estadosSkaters);

    try {
        const allStates = Array.from(estadosSkaters).map( (skt) => {
            return {id: skt.getAttribute("data-idSkater"), state: skt.checked}
        })
    
        const response = fetch("/api/skater_admin", {
            method: "put",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(allStates)
        })
        const data = (await response).json();
        console.log("All estados", response);
    } catch (error) {
        console.log("No se pudieron cambiar los estados: ", error);
    }

    // estadosSkaters.forEach( (skt) => {
    //     console.log(typeof skt, skt.getAttribute("data-idSkater"), skt.checked);
    // })

})