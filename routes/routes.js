const routes = require("express").Router();
const path = require("path");
const { StatusCodes: httpCodes } = require("http-status-codes");
const skaters = require("../controllers/skaters");


routes.get("/", (req, res) => {
    res.render("../views/index");
});

