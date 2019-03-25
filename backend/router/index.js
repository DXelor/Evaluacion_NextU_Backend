'use strict';

const storage = require('../storage');
const path = require('path');

const routes = (app) => {
    app.get('/search', (req, res) => {
        storage.getDataAll()
            .then((data)=>{
                res.json({"error": false, "datos": data});
            })
            .catch((err)=>{
                res.json({ "error": true, "datos": err});
            });
    }); //--- ./search ---

    //--- retorna las opciones del filtro ---
    app.get('/filteroptions', (req, res)=>{
        storage.getDataAll()
            .then((data) =>{
                let ciudades = [];
                let tipos = [];
                data.forEach((key, i) => {
                    if(ciudades.indexOf(key.Ciudad) < 0){
                        ciudades.push(key.Ciudad);
                    }
                    if(tipos.indexOf(key.Tipo) < 0) {
                        tipos.push(key.Tipo);
                    }
                });
                res.json({"error": false, "ciudades": ciudades, "tipos": tipos});
            })
            .catch((err) => {
                res.json({"error": true, "err": err});
            });
    });//--- ./filteroptions ---
}
module.exports = routes;