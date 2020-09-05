const cnx = require('../modules/conexion');

class CategoriaDAO{

    constructor(credenciales){
        this.credenciales = credenciales;
    }

    async listarCategorias(){

        const sentencia = async function(conexion){
            return await conexion.execute(
                `SELECT * FROM ctg`,
            );
        };

        return {exe: await cnx.run(this.credenciales, sentencia)};

    }

}

module.exports = { CategoriaDAO }