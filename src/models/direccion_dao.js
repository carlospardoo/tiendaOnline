const cnx = require('../modules/conexion');

class DireccionDAO{
    constructor(credenciales){
        this.credenciales = credenciales;
    }

    async crearDireccion(direccion){

        const sentencia = async function(conexion){
            return await conexion.execute(
                `INSERT INTO dir (N_DIRECCION, Q_TELEFONO, K_IDCIUDAD) 
                VALUES (:direccion, :telefono, :ciudad)`,
                [ direccion.direccion, direccion.telefono, direccion.ciudad ],
                { autoCommit: true }
            );
        };
         
        return {exe: await cnx.run(this.credenciales, sentencia)};
        
    }

    async crearDireccionCliente(direccion,cliente){

        const sentencia = async function(conexion){
            return await conexion.execute(
                "INSERT INTO clidir (K_IDDIRECCION, K_IDCLIENTE, I_ESTADO) VALUES(:direccion, :cliente, 'ACTIVO')",
                [ direccion, cliente ],
                { autoCommit: true }
            );
        };
         
        return {exe: await cnx.run(this.credenciales, sentencia)};
        
    }

    async cargarDirecciones(cliente){

        const sentencia = async function(conexion){
            return await conexion.execute(
                `SELECT dir.K_IDDIRECCION, dir.N_DIRECCION, dir.Q_TELEFONO
                FROM dir, clidir
                WHERE clidir.K_IDCLIENTE = :cliente and clidir.K_IDDIRECCION=dir.K_IDDIRECCION`,
                [cliente]
            );
        };
         
        return {exe: await cnx.run(this.credenciales, sentencia)};
        
    }

    async consultarIdDireccion(direccion){

        const sentencia = async function(conexion){
            return await conexion.execute(
                `SELECT K_IDDIRECCION
                FROM dir 
                WHERE N_DIRECCION=:direccion and Q_TELEFONO=:telefono`,
                [direccion.direccion, direccion.telefono]
            );
        };
         
        return {exe: await cnx.run(this.credenciales, sentencia)};
        
    }
}

module.exports = { DireccionDAO }
