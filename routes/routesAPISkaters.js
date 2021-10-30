const routesSkaters = require("express").Router();
const skaters = require("../controllers/skaters");



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
    console.log("rrff ", req.body);
    runControl(req, res, skaters.postSkater);
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


routesSkaters.post("/api/skater/pic", (req, res) => {
    console.log("API2 skaters post one");
    console.log("rrff ", req.files);
    runControl(req, res, skaters.uploadSkaterPic);
    // skaters.postSkater(req, res)
    // .then( (result) => {
    //     res.json(result);
    // })
    // .catch ( (error) => {
    //     console.log("error en post de skaters ", error.message);
    // })
});


const runControl = (req, res, skaterFunction) => {
    skaterFunction(req, res)
    .then( (result) => {
        res.status(result.serverCode);
        res.json(result.listaSkaters)
    })
    .catch ( (error) => {
        res.status(result.serverCode);
        res.json(result.errorMessage)
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