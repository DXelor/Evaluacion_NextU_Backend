'use strict';
//--- Modulos importados en constantes ---
const http = require('http'),
    bodyParser = require('body-parser'),
    express = require('express'),
    routes = require('./router');

//--- constantes globales ----
const port = process.env.PORT || 3000,
    app = express(),
    server = http.createServer(app);

routes(app);

//--- configuracion de la aplicacion ---
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

server.listen(port, ()=>{
    console.log("¡server encendido!, puerto: " + port);
});