const routesSkaters = require("express").Router();
const skaters = require("../controllers/skaters");
const { routes } = require("./routes");



// API v2. api returns values and they are showed by the router not the controller
routesSkaters.get("/api/skaters", (req, res) => {
    console.log("API2 skaters get all");
    runControl(req, res, skaters.getAll)
});

routesSkaters.get("/api/skater/:id", (req, res) => {
    console.log("API2 skaters get one");
    runControl(req, res, skaters.getOne);
});

routesSkaters.delete("/api/skater/:id", (req, res) => {
    console.log("API skaters delete one");
    runControl(req, res, skaters.deleteOne);
});

routesSkaters.post("/api/skater/new", (req, res) => {
    console.log("API2 skaters post one");
    runControl(req, res, skaters.postSkater2);
});

routesSkaters.put("/api/skater/:id", (req, res) => {
    console.log("API skaters edit one");
    runControl(req, res, skaters.editOne);
});



routesSkaters.post("/api/skater/auth", async (req, res) => {
    console.log("we enter in the route for login auth");

    const token = await skaters.verifyLogin(req, res);
    console.log("enla ruta post: ", token);
    res.status(token ? 200 : 401);
    res.json( token )
});


routesSkaters.post("/api/skater/pic/:email", async (req, res) => {
    console.log("API2 skaters post pic one");
    console.log("API post pic ", req.files);
    let uploaded = {}
    try { 
        uploaded = await skaters.uploadSkaterPic2(req, res);
        console.log("pic ", uploaded);
    }
    catch (error) {
        console.log("error de pic ", error.message);
    }
    finally {
        res.status(uploaded.serverCode);
        res.send(uploaded.listaSkaters)
    }
});

routes.put("/api/skater_admin", async (req, res) => {
    console.log("API skaters admin updates");
    runControl(req, res, skaters.adminUpdates);
})


const runControl = (req, res, skaterFunction) => {
    skaterFunction(req, res)
    .then( (result) => {
        console.log("runcontrol result", result);
        res.status(result.serverCode);
        res.json(result.listaSkaters)
    })
    .catch ( (error) => {
        console.log("error en runcontrol ", error);
        res.status(error.serverCode);
        res.json(error)
    })
}

const runControl2 = (req, res, skaterFunction) => {
    
    return new Promise ( (resolve, reject) => {
        skaterFunction(req, res)
        .then( (result) => {
            console.log("runcontrol result", result);
            res.status(result.serverCode);
            res.json(result.listaSkaters)
        })
        .catch ( (error) => {
            console.log("error en runcontrol ", error);
            res.status(error.serverCode);
            res.json(error)
        })
    })
    
}


const getToken = (req, res) => {
    try {
        const result = skaters.verifyLogin(req, res);
        const token = result.token;
        console.log("RRRR", result);
        console.log("ttt", token);
    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    routesSkaters
}