const routes = require("express").Router();
const skaters = require("../controllers/skaters");
const jwt = require("jsonwebtoken");
const { authKey } = require("../config/auth");


routes.get("/", (req, res) => {
    let skatersInfo = [];
    skaters.getAll(req, res)
    .then( async (skList) => {
        skatersInfo = await createSkArray(req, res, skList.listaSkaters)
    })
    .then( () => {
        res.render("../views/index", 
        {
            layout: "index",
            title: "Santiago Skate Park",
            skts: skatersInfo,
            showInicio: false,
            showLogin: true,
            showRegister: true
        });
    })
});

routes.get("/login", (req, res) => {
    res.render("../views/login", {
        title: "Santiago Skate Park - Login",
        showInicio: true,
        showLogin: false,
        showRegister: true
    })
});

routes.get("/register" , (req, res) => {
    
    res.render("../views/register", {
        title: "Santiago Skate Park - Registro",
        showInicio: true,
        showLogin: true,
        showRegister: false

    })
});

routes.get("/datos", (req, res) => {
    console.log("en ruta datos");
    const user = jwt.verify(req.query.tkn, authKey);
    const pwd = jwt.verify(req.query.pwd, authKey);
    console.log("user, pwd", user);
    res.status(200);
    res.render("../views/datos", {
        title: "Santiago Skate Park - Datos de skater",
        user: user[0],
        pwd: pwd,
        showInicio: true,
        showLogin: false,
        showRegister: false
    })
});

routes.get("/admin", (req, res) => {
    console.log("en ruta admin");
    let skatersInfo = [];
    skaters.getAll(req, res)
    .then( async (skList) => {
        skatersInfo = await createSkArray(req, res, skList.listaSkaters)
    })
    .then( () => {
        res.render("../views/admin", 
        {
            layout: "index",
            title: "Santiago Skate Park",
            skts: skatersInfo,
            showInicio: true,
            showLogin: false,
            showRegister: false
        });
    })
})




const createSkArray = async (req, res, skList) => {
    let skatersArray = [];
    let resultOne;
    try {
        for (i = 0; i < skList.length; i++) {
            req.params.id = skList[i].id;
            resultOne = await skaters.getOne(req, res);
            resultOne.listaSkaters[0].index = i + 1;
            skatersArray.push(resultOne.listaSkaters[0]);
        };
        return skatersArray;
    } catch (error) {
        console.log("Error en arreglo de skaters ", error.message);
    }
}



module.exports = {
    routes
}