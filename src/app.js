const express = require('express');
const cors = require("cors");
const morgan = require('morgan');
const conexionBD = require('./db.conexion');
const rutasHabitacion = require('./routes/habitaciones.routes');
const rutasUser=require('./routes/users.routes');
const rutasReservas=require('./routes/reservas.routes')
const app = express()



app.use(cors());
require('dotenv').config()

//Conexión a la BD
conexionBD();

//Configuraciones
app.set("name","api-hotelia");
app.set("port",process.env.PORT || 4000);
app.set("host",process.env.HOST || 'localhost');


//Midlewares
app.use(express.json());
app.use(morgan("dev"));

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

//Llamado de rutas

app.use(express.static('public'));

app.use('/public', express.static('public/upload'));
//app.use('/public', express.static(__dirname + '/public'));
//app.use("/")
app.use("/habitaciones",rutasHabitacion);
app.use("/users",rutasUser);
app.use("/reservas",rutasReservas);

module.exports=app;