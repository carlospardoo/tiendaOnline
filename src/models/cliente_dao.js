const cnx = require('../modules/conexion');

class ClienteDAO {

    constructor(credenciales){
        this.credenciales = credenciales;
    }

    async registrar(cliente){

        const sentencia = async function(conexion){
            return await conexion.execute(
                `INSERT INTO cli (I_TIPOIDENT,K_NUMIDENT,N_NOMBRE,F_FECHANACIMIENTO,I_GENERO,O_EMAIL,N_NOMBREUSUARIO) 
                VALUES ( :tipo, :cedula, :nombre, TO_DATE(:fecnac, 'YYYY-MM-DD'), :genero, :mail, :nusuario)`,
                [cliente.tipo, cliente.cedula, cliente.nombre, cliente.fechanac, cliente.genero, cliente.email, cliente.usuario],
                { autoCommit: true }
            );
        };
         
        return {exe: await cnx.run(this.credenciales, sentencia)};
        
    }

    async consultarClienteUsuario(){

        const nusuario = this.credenciales.username;

        const sentencia = async function(conexion){
            return await conexion.execute(
                `SELECT k_idcliente, I_TIPOIDENT, K_NUMIDENT, n_nombre, f_fechanacimiento, i_genero, o_email
                FROM cli WHERE n_nombreusuario = :nusuario`,
                [nusuario]
            );
        };

        return {exe: await cnx.run(this.credenciales, sentencia)};

    }

}

module.exports = { ClienteDAO }
