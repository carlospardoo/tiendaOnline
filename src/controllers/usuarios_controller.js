const modelUsuario = require('../models/usuario');
const usuarioDAO = require('../models/usuario_dao');
const modelCliente = require('../models/cliente');
const clienteDAO = require('../models/cliente_dao');
const modelDireccion = require('../models/direccion');
const direccionDAO = require('../models/direccion_dao');

const registro = (req, res) => {
    res.render('usuarios/registro');
};

const crear = async (req, res) => {

    let user = {username: 'admusrrfs', password: 'secreta'};
    /*if(req.session.usuario){
        user = req.session.usuario;
    }else{
        user = {};
    }*/
    console.log(req.body);
    const {tipo,cedula, nombre, fechanac, genero, email, usern, psswd,direccion,telefono,ciudad} = req.body;

    let usuario = new modelUsuario.Usuario(usern, psswd);
    const usuariodao = new usuarioDAO.UsuarioDAO(user);
    
    let result = await usuariodao.registrar(usuario);

    if( !result.exe.errorNum ){
        let cliente = new modelCliente.Cliente(null,tipo,cedula, nombre, fechanac, genero, email, usern, ciudad);
        //console.log(cliente.ciudad);
        //cliente.usuario = usern;
        let direccionCli = new modelDireccion.Direccion(null,direccion,telefono,ciudad);
        //console.log(cliente);
        //user = {username: usern, password: psswd};

        const clientedao = new clienteDAO.ClienteDAO(user);
        const dirdao = new direccionDAO.DireccionDAO(user);

        let dirCreado = await dirdao.crearDireccion(direccionCli);

        let cliCreado = await clientedao.registrar(cliente);

        //Agregando relación dirección cliente
        let cliId = await clientedao.consultarClienteUsuarioDef(cliente.usuario);
        let dirId = await dirdao.consultarIdDireccion(direccionCli);
        //console.log(cliId.exe.rows);
        //console.log(dirId.exe.rows);
        //console.log('Direccion id: '+dirId.exe.rows[0]);
        //console.log('Cliente id: '+cliId.exe.rows[0][0]);
        let dircliCreado = await dirdao.crearDireccionCliente(parseInt(dirId.exe.rows[0],10),parseInt(cliId.exe.rows[0][0],10));
        console.log(dircliCreado.exe);
        //result = cliCreado;
        if( cliCreado.exe.errorNum || dirCreado.exe.errorNum || dircliCreado.exe.errorNum){
            console.log("Entro a borrar");
            result.drop = await usuariodao.borrarUsuario(usuario.username);
        }

        

        /*result = await clientedao.registrar(cliente);
        if( result.exe.errorNum ){
            result.drop = await usuariodao.borrarUsuario(usuario.username);
        }*/
    }

    //console.log(result);
    res.send(result);

};

const acceso = (req, res) => {
    res.render('usuarios/acceso');
};

const login = async (req, res) => {
    
    const {usern, psswd} = req.body;
    let usuario = new modelUsuario.Usuario(usern, psswd);
    //console.log(usuario);
    const clientedao = new clienteDAO.ClienteDAO(usuario);
    let result = await clientedao.consultarClienteUsuarioDef(usern);
    //console.log(result.exe);
    if(result.exe.rows){
        req.session.usuario = usuario;
        req.session.usuario.cliente = new modelCliente.Cliente(
            result.exe.rows[0][0],
            result.exe.rows[0][1], 
            result.exe.rows[0][2], 
            result.exe.rows[0][3], 
            result.exe.rows[0][4], 
            result.exe.rows[0][5],
            result.exe.rows[0][6],
            result.exe.rows[0][7],
            result.exe.rows[0][9]);
        //req.session.usuario.cliente.id = result.exe.rows[0][0];
    }

    //console.log(result);
    res.send(result);
};

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

module.exports = { registro, crear, acceso, login, logout }