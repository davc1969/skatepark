const { StatusCodes: httpCodes } = require("http-status-codes");
const poolQuery = require("../services/pg_pool_services").pgPoolQuery;

const getAll = async (req, res) => {
    console.log("Controller skate getAll");
    const querySQL = {
        text: "select * from skaters;",
        values: []
    }
    try {
        const results = await poolQuery(querySQL);
        const skatersList = skatersHATEOAS(JSON.parse(results));
        res.status(httpCodes.OK);
        res.send(skatersList);
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR);
        res.json({
            error: error.id,
            message: error.message
        });
    }
};

const getOne = async (req, res) => {
    console.log("Controller skate getAll");
    const querySQL = {
        text: "select * from skaters where id = $1;",
        values: [req.params.id]
    }

    try {
        const results = await poolQuery(querySQL);
        res.status(httpCodes.OK);
        res.send(results);
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR);
        res.json({
            error: error.id,
            message: error.message
        });
    }
};

const postSkater = async (req, res) => {
    console.log("Controller skate post skater");
    console.log("body ", req.body);
    const querySQL = {
        text: "insert into skaters (nombre, email, password, anos_experiencia, especialidad, foto, estado) values($1, $2, $3, $4, $5, $6, $7) returning *;",
        values: Object.values(req.body)
    }

    try {
        const results = await poolQuery(querySQL);
        res.status(httpCodes.CREATED);
        res.send(results);
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR);
        res.json({
            error: error.id,
            message: error.message
        });
    }
};


const deleteOne = async (req, res) => {
    console.log("Controller skate delete one");
    const querySQL = {
        text: "delete from skaters where id = $1 returning *;",
        values: [req.params.id]
    }

    try {
        const results = await poolQuery(querySQL);
        res.status(httpCodes.ACCEPTED);
        res.send(results);
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR);
        res.json({
            error: error.id,
            message: error.message
        });
    }
};

const editOne = async (req, res) => {
    console.log("Controller skate edit one");
    const querySQL = {
        text: `update skaters set nombre = $1, password = $2, email = $3, anos_experiencia = $4, especialidad = $5, foto = $6, estado = $7 where id = ${req.params.id} returning *;`,
        values: Object.values(req.body)
    }

    try {
        const results = await poolQuery(querySQL);
        res.status(httpCodes.ACCEPTED);
        res.send(results);
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR);
        res.json({
            error: error.id,
            message: error.message
        });
    }
};




const skatersHATEOAS = (skaters) => { 
    const resultado = skaters.map((sk) => {
        const skt = {
            id: sk.id,
            nombre: sk.nombre,
            href: `http://localhost:3000/api/skaters/${sk.id}`,
        };
        return skt;
    });
    return resultado;
};



module.exports = {
    getAll,
    getOne,
    postSkater,
    deleteOne,
    editOne
}