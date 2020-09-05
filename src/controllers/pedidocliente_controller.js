const modelPedidoCliente = require('../models/pedidocliente');
const modelProducto = require('../models/producto');
const pedidoClienteDAO = require('../models/pedidocliente_dao');

const cargarPedido = async (req, res) => {

    let credenciales = {};
    if(req.session.usuario)
        credenciales = req.session.usuario;
    else
        credenciales = {username: 'clisrrfs', password: 'secreta'};

    let result = {};

    if(req.session.usuario){

        result = await consultarPedido(credenciales, req.session.usuario.cliente.id);

        if(result.exe.objects){
            if(result.exe.objects.pedido){
                req.session.usuario.pedido = result.exe.objects.pedido;
            }
        }

    }else {

        result.exe = {errorNum: true, error: 'Privilegios insuficientes para cargar el pedido'};

    }

    res.send(result);
};

const crearPedido = async (req, res) => {

    let credenciales = {};
    if(req.session.usuario)
        credenciales = req.session.usuario;
    else
        credenciales = {username: 'clisrrfs', password: 'secreta'};

    let result = {};

    if(req.session.usuario){

        const pedidoclientedao = new pedidoClienteDAO.PedidoClienteDAO(credenciales);
        result = await pedidoclientedao.crearPedido(req.session.usuario.cliente.id/*, ciudad*/);

        if(result.exe.rowsAffected){

            result = await consultarPedido(credenciales, req.session.usuario.cliente.id);
            if(result.exe.objects){
                if(result.exe.objects.pedido){
                    req.session.usuario.pedido = result.exe.objects.pedido;
                }
            }

        }

    }else {

        result.exe = {errorNum: true, error: 'Privilegios insuficientes para cargar el pedido'};

    }

    res.send(result);

};

const consultarPedido = async (credenciales, cliente) => {

    const pedidoclientedao = new pedidoClienteDAO.PedidoClienteDAO(credenciales);
    let result = await pedidoclientedao.verificarPedido(cliente);

    if(result.exe.rows){
        if(result.exe.rows.length){
            let pedido = new modelPedidoCliente.PedidoCliente(
                result.exe.rows[0][0],
                result.exe.rows[0][1],
                result.exe.rows[0][2],
                result.exe.rows[0][3],
                result.exe.rows[0][4],
                result.exe.rows[0][5]
            );
            pedido.id = result.exe.rows[0][6];
            pedido.productos = [];

            result = await pedidoclientedao.cargarProductos(pedido.id);
            if(result.exe.rows){
                for(let i=0; i<result.exe.rows.length; i++){
                    let producto = new modelProducto.Producto(
                        result.exe.rows[i][1],
                        result.exe.rows[i][2],
                        result.exe.rows[i][3],
                        result.exe.rows[i][4],
                        result.exe.rows[i][5]
                    );
                    producto.referencia = result.exe.rows[i][0];
                    producto.id = result.exe.rows[i][6];
                    producto.cantidad = result.exe.rows[i][7];
                    producto.precio = result.exe.rows[i][8];
                    //producto.ciudad
                    pedido.productos.push(producto);
                }
            }

            result.exe.objects = {pedido: pedido};

        }
    }

    return result;

}

const agregarItem = async (req, res) => {

    let credenciales = {};
    if(req.session.usuario)
        credenciales = req.session.usuario;
    else
        credenciales = {username: 'clisrrfs', password: 'secreta'};

    let result = {};

    if(req.session.usuario){

        if(req.session.usuario.pedido){

            const pedidoclientedao = new pedidoClienteDAO.PedidoClienteDAO(credenciales);
            const {producto, cantidad, precio} = req.body;
            result = await pedidoclientedao.agregarProducto(req.session.usuario.pedido.id, producto, cantidad, precio);
            
            if(result.exe.rowsAffected){
                result = await pedidoclientedao.actualizarPedidoAgregarProducto(req.session.usuario.pedido.id, cantidad, precio);
                if(result.exe.rowsAffected){
                    result = await consultarPedido(credenciales, req.session.usuario.cliente.id);
                    if(result.exe.rows){
                        if(result.exe.rows.length){
                            req.session.usuario.pedido = result.exe.objects.pedido;
                        }
                    }
                
                }

            }

        }else{

            result.exe = {errorNum: true, error: 'Usuario sin pedidos actuales'};

        }

    }else{

        result.exe = {errorNum: true, error: 'Privilegios insuficientes para agregar items'};

    }

    res.send(result);

};

const quitarItem = async (req, res) => {
    
    let credenciales = {};
    if(req.session.usuario)
        credenciales = req.session.usuario;
    else
        credenciales = {username: 'clisrrfs', password: 'secreta'};

    let result = {};

    if(req.session.usuario){

        if(req.session.usuario.pedido){

            const pedidoclientedao = new pedidoClienteDAO.PedidoClienteDAO(credenciales);
            const {idprodpcli, cantidad, precio} = req.body;
            result = await pedidoclientedao.quitarProducto(idprodpcli);
            
            if(result.exe.rowsAffected){
                result = await pedidoclientedao.actualizarPedidoQuitarProducto(req.session.usuario.pedido.id, cantidad, precio);
                if(result.exe.rowsAffected){
                    result = await consultarPedido(credenciales, req.session.usuario.cliente.id);
                    if(result.exe.rows){
                        if(result.exe.rows.length){
                            req.session.usuario.pedido = result.exe.objects.pedido;
                        }
                    }
                
                }

            }

        }

        res.send(result);

    }

};

const vaciarPedido = async (req, res) => {
    
    let credenciales = {};
    if(req.session.usuario)
        credenciales = req.session.usuario;
    else
        credenciales = {username: 'clisrrfs', password: 'secreta'};

    let result = {};

    if(req.session.usuario){

        if(req.session.usuario.pedido){

            const pedidoclientedao = new pedidoClienteDAO.PedidoClienteDAO(credenciales);
            result = await pedidoclientedao.vaciar(req.session.usuario.pedido.id);
            
            if(result.exe.rowsAffected){
                result = await pedidoclientedao.actualizarPedidoVaciar(req.session.usuario.pedido.id);
                if(result.exe.rowsAffected){
                    result = await consultarPedido(credenciales, req.session.usuario.cliente.id);
                    if(result.exe.rows){
                        if(result.exe.rows.length){
                            req.session.usuario.pedido = result.exe.objects.pedido;
                        }
                    }
                
                }

            }

        }

        res.send(result);

    }

};

module.exports = { cargarPedido, crearPedido, agregarItem, quitarItem, vaciarPedido };