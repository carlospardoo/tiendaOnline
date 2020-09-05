const cnx = require('../modules/conexion');

class CiudadDAO{

    constructor(credenciales){
        this.credenciales = credenciales;
    }

    async listarCiudades(){

        const sentencia = async function(conexion){
            return await conexion.execute(
                `SELECT * FROM ciu`,
            );
        };

        return {exe: await cnx.run(this.credenciales, sentencia)};

    }

}

module.exports = { CiudadDAO }