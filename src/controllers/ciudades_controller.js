const modelCiudad = require('../models/ciudad');
const ciudadDAO = require('../models/ciudad_dao');

const listarCiudades = async (req, res) => {
    
    let credenciales = {};
    if(req.session.usuario)
        credenciales = req.session.usuario;
    else
        credenciales = {username: 'clisrrfs', password: 'secreta'};

    const ciudaddao = new ciudadDAO.CiudadDAO(credenciales);

    let result = await ciudaddao.listarCiudades();

    if(result.exe.rows){
        let ciudades = [];
        for(let i=0; i<result.exe.rows.length; i++){
            let ciudad = new modelCiudad.Ciudad(
                result.exe.rows[i][1]);
            ciudad.id = result.exe.rows[i][0];
            ciudades.push(ciudad);
        }
        result.exe.objects = ciudades;
    }

    res.send(result);

};

module.exports = { listarCiudades }