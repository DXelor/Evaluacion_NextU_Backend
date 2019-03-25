'use strict';
//modulos importados en constantes
const fs = require('fs');
const path = require('path');

//exportar modulo
module.exports = {
    //retorna todos los datos almacenados en data.json
    getDataAll: () => {
        var self = this;
        let dataPath = __dirname + path.join('/data/data.json');
        return new Promise((resolve, reject)=>{
            fs.readFile(dataPath, 'utf8', (err, Rdata) => {
                if(err) reject(err);
                resolve(JSON.parse(Rdata));
            });
        });
    }
};