const cnx = require('../modules/conexion');

class UsuarioDAO {

    constructor(credenciales){
        this.credenciales = credenciales;
    }

    async registrar(usuario){

        let sentencia = async function(conexion){
            return await conexion.execute(
                `CREATE USER ` + usuario.username + ` IDENTIFIED BY ` + usuario.password + `
                DEFAULT TABLESPACE rfsdef
                TEMPORARY TABLESPACE rfstmp
                QUOTA 2m ON rfsdef`
            );
        };

        let result = {exe: await cnx.run(this.credenciales, sentencia)};

        if ( !result.exe.errorNum ) {

            sentencia = async function(conexion){
                return await conexion.execute(
                    `GRANT clirrfs TO ` + usuario.username + ``
                );
            };

            result = {exe: await cnx.run(this.credenciales, sentencia)};

            if( result.exe.errorNum )
                result.drop = await this.borrarUsuario(usuario.username);

        }

        return result;
        
    }

    async borrarUsuario(nombre){

        const sentencia = async function(conexion){
            return await conexion.execute(
                `DROP USER ` + nombre + ` CASCADE`
            );
        };

        return await cnx.run(this.credenciales, sentencia);

    }

}

module.exports = { UsuarioDAO }