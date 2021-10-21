const routesSkaters = require("express").Router();
const skaters = require("../controllers/skaters");


//API skaters
routesSkaters.get("/api", (req, res) => {
    console.log("API skaters get all");
    skaters.getAll(req, res)
});

routesSkaters.get("/api/skater/:id", (req, res) => {
    console.log("API skaters get one");
    skaters.getOne(req, res)
});

routesSkaters.post("/api", (req, res) => {
    console.log("API skaters post one")
    skaters.postSkater(req, res);
});

routesSkaters.delete("/api/skater/:id", (req, res) => {
    console.log("API skaters delete one");
    skaters.deleteOne(req, res)
});

routesSkaters.put("/api/skater/:id", (req, res) => {
    console.log("API skaters edit one");
    skaters.editOne(req, res)
});

module.exports = {
    routesSkaters
}