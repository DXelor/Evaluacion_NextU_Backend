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

    //--- retorna los datos filtrados ---
    app.get('/ciudad/:ciudadId/tipo/:tipoId/desde/:desdeVal/hasta/:hastaVal', (req, res)=>{
        let params = req.params;
        let datos = [];
        storage.getDataAll()
            .then(data => {
                var ax = [];
                var bx = [];
                var datos = [];

                ax = data.slice(); //--- retorna data en un array, como un nuevo objeto de array  ---

                //--- validacion en la seleccion de las ciudades ---
                if (params.ciudad != "todas"){
                    //---  recorre y filtra cada una de las ciudades ---

                    ax.forEach((key, i) => {
                        if (key.Ciudad == params.ciudadId){ bx.push(key); }
                    });
                } else {
                    bx = ax.slice();
                }

                //--- reiniciar arrays bx, ax y cada array retornado de este ---
                ax= [];
                ax = bx.slice();
                bx = [];

                //--- valida la seleccion de un tipo de propiedad ---

                if (params.tipoId != "todos") {
                    //--- valida y filtra segun el tipo de propiedad seleccionada ---
                    ax.forEach((key, i) =>{
                        if (key.Tipo == params.tipoId) { bx.push(key); }
                    });
                } else {
                    bx = ax.slice();
                }

                //--- recorre y filtra si esta entre los valores seleccionados ---

                bx.forEach((key, i)=>{
                    let valor = parseInt(key.Precio.replace("$", "").replace(",", ""));
                    if (valor >= parseInt(params.desdeVal) && valor <= parseInt(params.hastaVal)){
                        datos.push(key);
                    }
                });

                res.status(200).json({ datos, params });
            })
            .catch((err) =>{
                res.json({ "error": true, "err": err });
            });
    });
}
module.exports = routes;