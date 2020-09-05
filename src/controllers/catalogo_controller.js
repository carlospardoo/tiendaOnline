const modelProducto = require('../models/producto');
const productoDAO = require('../models/producto_dao');

const consultarProductosCiudad = async (req, res) => {

    let credenciales = {};
    if(req.session.usuario)
        credenciales = req.session.usuario;
    else
        credenciales = {username: 'clisrrfs', password: 'secreta'};

    const productodao = new productoDAO.ProductoDAO(credenciales);

    let result = await productodao.consultarProductos(req.query.idciudad, null, null, null);

    if(result.exe.rows){
        result.exe.objects = formatearCosultaProductos(result.exe.rows);
    }

    res.send(result);

};

const consultarProductosCriterios = async (req, res) => {

    let credenciales = {};
    if(req.session.usuario)
        credenciales = req.session.usuario;
    else
        credenciales = {username: 'clisrrfs', password: 'secreta'};

    const {ciudad, producto, categoria, criterioOrden} = req.query;

    const productodao = new productoDAO.ProductoDAO(credenciales);

    let result = await productodao.consultarProductos(ciudad, producto, categoria, criterioOrden);

    if(result.exe.rows){
        result.exe.objects = formatearCosultaProductos(result.exe.rows);
    }

    res.send(result);

};

const formatearCosultaProductos = (rows) => {
    let productos = [];
    for(let i=0; i<rows.length; i++){
        let producto = new modelProducto.Producto(
            rows[i][1], 
            rows[i][2], 
            {
                id: rows[i][3], 
                nombre: rows[i][4], 
                categoria: {
                    id: rows[i][5], 
                    nombre: rows[i][6]
                }
            }, 
            rows[i][7], rows[i][8]);
        producto.ciudad = {id: rows[i][11],nombre: rows[i][12]};
        producto.cantidad = rows[i][9];
        producto.precio = rows[i][10];
        producto.id = rows[i][0];
        productos.push(producto);
    }
    return productos;
}

module.exports = { consultarProductosCiudad, consultarProductosCriterios }