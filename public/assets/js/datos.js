
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
            console.log("data system: ", data);
        } catch (error) {
            console.error(error)
        } finally {
            location.href = "/"
        }
    } else {
        console.log("se salvo");
    }
})