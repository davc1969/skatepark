
document.getElementById("formLogin").addEventListener("submit" , async (event) => {

    event.preventDefault();

    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passwordLogin").value;


    try {
        console.log("login: ", email, password);
        const data = await getToken(email, password);
        console.log("log ", data);
        if (data) {
            localStorage.setItem("tokenSkt", data.token);
            location.href = "/datos?tkn=" + data.token + "&pwd=" + data.pass;
        } else {
            alert("usuario o contraseña errada.  Intente nuevamente")
        }
    }
    catch (error) {
        console.log(error);
    }



    // const response = await axios.post("/api/v2/auth", { email, password })
    // .then ( (response) => {
    //     const { data } = response;
    //     return data;
    // })
    // .then ( (data) => {
    //     console.log(data);
    //     alert( data.verified ? "SI" : "NO")
    // })
    // .catch ( error => console.log(error))
    // .finally ( () => {
    //     alert("")
    // })

})


async function getVerified(email, password) {
    return axios("http://localhost:3000/api/v2/auth", { email, password })
    .then(res => res.data.verified)
    .catch(error => error);
  }


const getToken = async (email, password) => {
    try {
        console.log("vu ", email, password);
        const response = await fetch("http://localhost:3000/api/skater/auth", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email: email, password: password })
        });
        const data = await response.json();
        console.log("getUserToken: ", data);
        return data;
    } catch (err) {
        console.error(`Error: ${err}`);
    }
}