const modelUsuario = require('../models/usuario');
const usuarioDAO = require('../models/usuario_dao');
const modelCliente = require('../models/cliente');
const clienteDAO = require('../models/cliente_dao');

const registro = (req, res) => {
    res.render('usuarios/registro');
};

const crear = async (req, res) => {

    let user = {};
    if(req.session.usuario){
        user = req.session.usuario;
    }else{
        user = {username: 'admusrrfs', password: 'secreta'};
    }

    const {tipo,cedula, nombre, fechanac, genero, email, usern, psswd} = req.body;

    let usuario = new modelUsuario.Usuario(usern, psswd);
    const usuariodao = new usuarioDAO.UsuarioDAO(user);
    
    let result = await usuariodao.registrar(usuario);

    if( !result.exe.errorNum ){
        let cliente = new modelCliente.Cliente(tipo,cedula, nombre, fechanac, genero, email);
        cliente.usuario = usern;
        //console.log(cliente);
        const clientedao = new clienteDAO.ClienteDAO(user);
        result = await clientedao.registrar(cliente);
        if( result.exe.errorNum ){
            result.drop = await usuariodao.borrarUsuario(usuario.username);
        }
    }

    console.log(result);
    res.send(result);

};

const acceso = (req, res) => {
    res.render('usuarios/acceso');
};

const login = async (req, res) => {
    
    const {usern, psswd} = req.body;
    let usuario = new modelUsuario.Usuario(usern, psswd);

    const clientedao = new clienteDAO.ClienteDAO(usuario);
    let result = await clientedao.consultarClienteUsuario();

    if(result.exe.rows){
        req.session.usuario = usuario;
        req.session.usuario.cliente = new modelCliente.Cliente(
            result.exe.rows[0][1], 
            result.exe.rows[0][2], 
            result.exe.rows[0][3], 
            result.exe.rows[0][4], 
            result.exe.rows[0][5]);
        req.session.usuario.cliente.id = result.exe.rows[0][0];
    }

    console.log(result);
    res.send(result);
};

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

module.exports = { registro, crear, acceso, login, logout }