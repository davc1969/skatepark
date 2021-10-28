const { StatusCodes: httpCodes } = require("http-status-codes");
const poolQuery = require("../services/pg_pool_services").pgPoolQuery;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authKey } = require("../config/auth")

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
        return {
            serverCode: httpCodes.OK,
            error: 0,
            errorMessage: "",
            listaSkaters: JSON.parse(results)
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
        console.log("delete ", results.length);
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
        text: `update skaters set nombre = $1, password = $2, email = $3, anos_experiencia = $4, especialidad = $5, foto = $6, estado = $7 where id = ${req.params.id} returning *;`,
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



const skaterUploadImage = (req, res) => {
    const imgFile = req.files ? req.files.target_file : null;
    if (!imgFile) {
        res.json({
            error: error.id,
            message: error.message
        })
    } else {
        archivo.mv(path.join("/pics", imgFile), (error) => {
            if (error) { 
                console.log("Error al cargar la foto ", error.message);
                res.status(500).send("<h3>No se puede procesar imagen, falta información</h3>");
            } else {
                console.log("Imagen cargada exitosamente");
                res.redirect("/")
            }
        });
    }
}



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


module.exports = {
    getAll,
    getOne,
    postSkater,
    deleteOne,
    editOne,
    verifyLogin
}