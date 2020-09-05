const modelCategoria = require('../models/categoria');
const categoriaDAO = require('../models/categoria_dao');

const listarCategorias = async (req, res) => {

    let credenciales = {};
    if(req.session.usuario)
        credenciales = req.session.usuario;
    else
        credenciales = {username: 'clisrrfs', password: 'secreta'};

    const categoriadao = new categoriaDAO.CategoriaDAO(credenciales);

    let result = await categoriadao.listarCategorias();

    if(result.exe.rows){
        let categorias = [];
        for(let i=0; i<result.exe.rows.length; i++){
            let categoria = new modelCategoria.Categoria(
                result.exe.rows[i][1]);
            categoria.id = result.exe.rows[i][0];
            if(result.exe.rows[i][2]){
                for(let j=0; j<categorias.length; j++){
                    if(categorias[j].id == result.exe.rows[i][2]){
                        if(!categorias[j].categorias){
                            categorias[j].categorias = []
                        }
                        categorias[j].categorias.push(categoria);
                        j=categorias.length;
                    }
                }
            }else{
                categorias.push(categoria);
            }
        }
        result.exe.objects = categorias;
    }

    res.send(result);

};

module.exports = { listarCategorias }