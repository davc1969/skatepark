const { StatusCodes: httpCodes } = require("http-status-codes");
const poolQuery = require("../services/pg_pool_services").pgPoolQuery;
const poolTransaction = require("../services/pg_pool_services").pgPoolTransaction;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const { authKey } = require("../config/auth");
const { v4: uuidv4 } = require('uuid');
const jimp = require("jimp");


const getAll = async (req, res) => {
    console.log("Controller skate getAll");
    const querySQL = {
        text: "select * from skaters;",
        values: []
    }
    try {
        const results = await poolQuery(querySQL);
        const skatersList = skatersHATEOAS(JSON.parse(results));
        return {
            serverCode: httpCodes.OK,
            error: 0,
            errorMessage: "",
            listaSkaters: skatersList
        }
    } catch (error) {
        return {
            serverCode: httpCodes.INTERNAL_SERVER_ERROR,
            error: error.code,
            errorMessage: error.message,
            listaSkaters:[]
        }
    }
};

const getOne = async (req, res) => {
    console.log("Controller skate getOne");
    const querySQL = {
        text: "select * from skaters where id = $1;",
        values: [req.params.id]
    }

    try {
        const results = await poolQuery(querySQL);
        const resultsJSON = JSON.parse(results);
        resultsJSON[0].foto = "/pics/" + resultsJSON[0].foto;
        return {
            serverCode: httpCodes.OK,
            error: 0,
            errorMessage: "",
            listaSkaters: resultsJSON
        }
    } catch (error) {
        return {
            serverCode: httpCodes.INTERNAL_SERVER_ERROR,
            error: error.code,
            errorMessage: error.message,
            listaSkaters:{}
        }
    }
};

const postSkater = async (req, res) => {
    console.log("Controller skate post skater");

    try {
        console.log("post sk body ", req.body);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        req.body.anos_experiencia = parseInt(req.body.anos_experiencia);

        const querySQL = {
            text: "insert into skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) values($1, $2, $3, $4, $5, $6, $7) returning *;",
            values: Object.values(req.body)
        }
        const results = await poolQuery(querySQL);
        return {
            serverCode: httpCodes.CREATED,
            error: 0,
            errorMessage: "",
            listaSkaters: JSON.parse(results)
        }
    } catch (error) {
        console.log("error en post ", error, error.code);
        return {
            serverCode: httpCodes.INTERNAL_SERVER_ERROR,
            error: error.code,
            errorMessage: error.message,
            listaSkaters:{}
        }
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
        if (results.length == 2) {
            throw error = {code: 500, message: "skater not found"}
        } else { 
            return {
                serverCode: httpCodes.ACCEPTED,
                error: 0,
                errorMessage: "",
                listaSkaters: JSON.parse(results)
            }
        }
    } catch (error) {
        return {
            serverCode: httpCodes.INTERNAL_SERVER_ERROR,
            error: error.code,
            errorMessage: error.message,
            listaSkaters: {}
        };
    }
};


const editOne = async (req, res) => {
    console.log("Controller skate edit one");
    const querySQL = {
        text: `update skaters set nombre = $1, password = $2, anos_experiencia = $3, especialidad = $4, estado = $5 where id = ${req.params.id} returning *;`,
        values: Object.values(req.body)
    }

    try {
        const results = await poolQuery(querySQL);
        return {
            serverCode: httpCodes.ACCEPTED,
            error: 0,
            errorMessage: "",
            listaSkaters: JSON.parse(results)
        }
    } catch (error) {
        return {
            serverCode: httpCodes.INTERNAL_SERVER_ERROR,
            error: error.code,
            errorMessage: error.message,
            listaSkaters:[]
        }
    }
};


const postSkater2 = async (req, res) => {
    console.log("Controller skate post skater");

    return new Promise ( async (resolve, reject) => {
        try {
            console.log("post sk body ", req.body);
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPassword;
            req.body.anos_experiencia = parseInt(req.body.anos_experiencia);
    
            const querySQL = {
                text: "insert into skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) values($1, $2, $3, $4, $5, $6, $7) returning *;",
                values: Object.values(req.body)
            }
            const results = await poolQuery(querySQL);
            resolve ({
                serverCode: httpCodes.CREATED,
                error: 0,
                errorMessage: "",
                listaSkaters: JSON.parse(results)
            })
        } catch (error) {
            console.log("error en post ", error, error.code);
            reject ({
                serverCode: httpCodes.INTERNAL_SERVER_ERROR,
                error: error.code,
                errorMessage: error.message,
                listaSkaters:{}
            })
        }
    })
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


const uploadSkaterPic2 = (req, res) => {

    const imgFile = req.files ? req.files.skaterPic : null;
    const extension = path.extname(imgFile.name)
    let output = {};

    if (!imgFile) {
        console.log("upload in skaters, img no encontrada");
        output = {
            serverCode: httpCodes.INTERNAL_SERVER_ERROR,
            error: 500,
            errorMessage: "no file found",
            listaSkaters:[]
        }
    } else {
        try {
            const newPicName = req.params.email + "_" + uuidv4().slice(0, 8) + extension;
            imgFile.mv(path.join(__dirname, "../files/profilesPics", newPicName));
            console.log("Imagen cargada exitosamente");
            changeSize(path.join(__dirname, "../files/profilesPics", newPicName));
            output = {
                serverCode: httpCodes.ACCEPTED,
                error: 0,
                errorMessage: "",
                listaSkaters: [newPicName]
            }
        } catch (error) {
            console.log("try 2", error);
            output = {
                serverCode: httpCodes.INTERNAL_SERVER_ERROR,
                error: error.code,
                errorMessage: error.message,
                listaSkaters: []
            }
        } finally {
            return output
        }
    }
}


const adminUpdates = async (req, res) => {
    let allQueries = [];

    req.body.forEach(element => {
        allQueries.push({
            text: `update skaters set estado = ${element.state} where id = ${element.id};`,
            values: []
        })
    });
    let output = {};
    try {
        const response = await poolTransaction(allQueries)
        output = {
            serverCode: httpCodes.ACCEPTED,
            error: 0,
            errorMessage: "",
            listaSkaters: []
        }
    } catch (error) {
        console.log("Error en admin updates transacciones: ", error.message);
        output = {
            serverCode: httpCodes.INTERNAL_SERVER_ERROR,
            error: error.code,
            errorMessage: error.message,
            listaSkaters: []
        }
    } finally {
        return output
    }
};


const verifyLogin = async  (req, res) => {
    console.log("we enter in the controller");

    try {
        const user = await verifyUser(req, res);
        if (user) {
            const token = generateToken(user);
            const origPass = jwt.sign(req.body.password, authKey)
            return { token: token, pass: origPass }
        } else {
            console.log("no hay user");
            return false
        }
    }
    catch (error) {
        console.log("error en verifyLogin: ", error.message);
        return false
    }

};


const verifyUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const querySQL = {
            text: "select * from skaters where email = $1;",
            values:[email],
            rowMode: 'Array'
        }
        const results = await poolQuery(querySQL);
        if (results.length > 0) {
            const results2 = JSON.parse(results);
            const verified = await bcrypt.compare(password, results2[0].password);
            return verified ? results2 : false;
        } else {
            return false
        }
    } catch (error) {
        console.log("error en funcion verifyUser: ", error.message);
        return false
    }
};

const generateToken = (user) => {
    const token = jwt.sign(JSON.stringify(user), authKey);
    return token
}


const changeSize = (filename) => {

    console.log("entrando a usar jimp");
    jimp.read(filename)
    .then ( img => {
        img.resize(60, 60).write(filename)
    })
    .catch ( (err) => {
        console.log("No se cambió el tamaño ", err);
    })
}

module.exports = {
    getAll,
    getOne,
    postSkater,
    postSkater2,
    deleteOne,
    editOne,
    verifyLogin,
    uploadSkaterPic2,
    adminUpdates
}