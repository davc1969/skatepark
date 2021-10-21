const express = require("express");
const app = express();
require("dotenv").config();
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 3000;
const { routes } = require("./routes/routes");
const { routesSkaters } = require("./routes/routesAPISkaters")


//views and partials engine
app.engine("hbs", exphbs({
    extname: "hbs",
    defaultLayout: 'index',
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
}));
app.set("view engine", "hbs");


// middlewares
app.use(express.static("./public/assets"));

app.use(express.json());


//routes
app.use(routes);
app.use(routesSkaters);



app.listen(PORT, () => {
    console.log(`Server is up and listening by port ${PORT}, process: ${process.pid}`);
})