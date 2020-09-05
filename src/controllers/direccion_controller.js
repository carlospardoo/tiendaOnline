const modelDireccion = require('../models/direccion');
const direccionDAO = require('../models/direccion_dao');

const insercionDireccion =  (req,res) =>{

}

consultaDirecciones = async (req,res) =>{
    let credenciales = {};
    if(req.session.usuario)
        credenciales = req.session.usuario;
    else
        credenciales = {username: 'useradmrfs', password: 'secreta'};

    const direccion_DAO = new direccionDAO.DireccionDAO(credenciales);
    let consultarDirecciones = await direccion_DAO.cargarDirecciones(1/*Cliente*/);
    //console.log(consultarDirecciones);
    let direcciones =[];
    if(consultarDirecciones.exe.rows){
        for(let i in consultarDirecciones.exe.rows){
            let modelDirecciones = new modelDireccion.Direccion(
                consultarDirecciones.exe.rows[i][0],
                consultarDirecciones.exe.rows[i][1],
                consultarDirecciones.exe.rows[i][2],
                1/*Ciudad*/
            );
            direcciones.push(modelDirecciones);
        }
    }
    console.log(direcciones);
    res.render('direccion',direcciones);
}

module.exports = { consultaDirecciones }