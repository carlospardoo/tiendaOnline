const cnx = require('../modules/conexion');

class PedidoClienteDAO{

    constructor(credenciales){
        this.credenciales = credenciales;
    }

    async verificarPedido(cliente){

        const sentencia = async function(conexion){
            return await conexion.execute(
                `SELECT pcli.f_fechacreacion, pcli.f_fechamodificacion, pcli.v_subtotal, pcli.q_numeroproductos, pcli.v_iva, pcli.v_valortotal, pcli.k_idpedidocliente, V_COSTOENVIO 
                FROM pcli
                WHERE pcli.k_idcliente = :cliente AND pcli.i_estado = 'INICIADO'`,
                [cliente]
            );
        };
         
        return {exe: await cnx.run(this.credenciales, sentencia)};
        
    }

    async cargarProductos(pedido){

        const sentencia = async function(conexion){
            return await conexion.execute(
                `SELECT prod.k_idreferenciaunica, prod.n_nombre, prod.n_marca, 
                prod.k_idcategoria, prod.n_unidadmedida, prod.l_imagen, 
                prodpcli.k_idproductopedidocliente, prodpcli.q_cantidad, 
                prodpcli.v_precio
                        FROM pcli, prodpcli, prod, inv
                        WHERE pcli.k_idpedidocliente = :pedido 
                        AND pcli.k_idpedidocliente = prodpcli.k_idpedidocliente 
                        AND prodpcli.K_IDINVENTARIO = inv.K_IDINVENTARIO 
                        AND inv.K_IDREFERENCIAUNICA = prod.K_IDREFERENCIAUNICA`,
                [pedido]
            );
        };
         
        return {exe: await cnx.run(this.credenciales, sentencia)};
        
    }

    async crearPedido(cliente/*,ciudad*/){

        const sentencia = async function(conexion){
            return await conexion.execute(
                `INSERT INTO pcli (F_FECHACREACION, F_FECHAMODIFICACION, I_ESTADO, V_SUBTOTAL, Q_NUMEROPRODUCTOS, K_IDCLIENTE, V_COSTOENVIO, V_VALORTOTAL, V_IVA) 
                VALUES (TO_DATE(sysdate), TO_DATE(sysdate), 'INICIADO', 0, 0, :idcliente, 0, 0, 0)`,
                [ cliente ],
                { autoCommit: true }
            );
        };
         
        return {exe: await cnx.run(this.credenciales, sentencia)};
        
    }

    async agregarProducto(pedido, producto, cantidad, precio){

        const sentencia = async function(conexion){
            return await conexion.execute(
                `INSERT INTO prodpcli (K_IDPEDIDOCLIENTE, K_IDREFERENCIAUNICA, Q_CANTIDAD, V_PRECIO) 
                VALUES (:idpedido, :referencia, :cantidad, :precio)`,
                [ pedido, producto, cantidad, precio ],
                { autoCommit: true }
            );
        };
         
        return {exe: await cnx.run(this.credenciales, sentencia)};
        
    }

    async actualizarPedidoAgregarProducto(pedido, prodcantidad, precio){

        const sentencia = async function(conexion){
            return await conexion.execute(
                `UPDATE pcli 
                SET F_FECHAMODIFICACION=TO_DATE(sysdate),
                    Q_NUMEROPRODUCTOS=(SELECT q_numeroproductos+ :cantidad from pcli WHERE k_idpedidocliente= :idpedido),
                    V_SUBTOTAL =(SELECT v_subtotal + (:valor*:cantidad) from pcli WHERE k_idpedidocliente = :idpedido),
                    V_IVA= (SELECT ((v_subtotal + (:valor*:cantidad))*0.19) from pcli WHERE k_idpedidocliente =:idpedido),
                    V_VALORTOTAL= (SELECT (v_subtotal + (:valor*:cantidad))+ ((v_subtotal + (:valor*:cantidad))*0.19) from pcli WHERE k_idpedidocliente = :idpedido) 
                WHERE k_idpedidocliente =: idpedido`,
                { idpedido : {val: pedido}, cantidad : {val: prodcantidad}, valor : {val: precio}},
                { autoCommit: true },
            );
        };
         
        return {exe: await cnx.run(this.credenciales, sentencia)};
        
    }

    async quitarProducto(idprodpcli){

        const sentencia = async function(conexion){
            return await conexion.execute(
                'DELETE FROM prodpcli WHERE prodpcli.K_IDPRODUCTOPEDIDOCLIENTE=:id',
                [idprodpcli],
                { autoCommit: true }
            );
        };
         
        return {exe: await cnx.run(this.credenciales, sentencia)};
        
    }

    async actualizarPedidoQuitarProducto(pedido, prodcantidad, precio){

        const sentencia = async function(conexion){
            return await conexion.execute(
                `UPDATE pcli 
                SET F_FECHAMODIFICACION=TO_DATE(sysdate),
                    Q_NUMEROPRODUCTOS=(SELECT q_numeroproductos+ :cantidad from pcli WHERE k_idpedidocliente= :idpedido),
                    V_SUBTOTAL =(SELECT v_subtotal - (:valor*:cantidad) from pcli WHERE k_idpedidocliente = :idpedido),
                    V_IVA= (SELECT ((v_subtotal - (:valor*:cantidad))*0.19) from pcli WHERE k_idpedidocliente =:idpedido),
                    V_VALORTOTAL= (SELECT (v_subtotal - (:valor*:cantidad)) + ((v_subtotal - (:valor*:cantidad))*0.19) from pcli WHERE k_idpedidocliente = :idpedido) 
                WHERE k_idpedidocliente =: idpedido`,
                { idpedido : {val: pedido}, cantidad : {val: prodcantidad}, valor : {val: precio}},
                { autoCommit: true },
            );
        };
         
        return {exe: await cnx.run(this.credenciales, sentencia)};
        
    }

    async vaciar(pedido){

        const sentencia = async function(conexion){
            return await conexion.execute(
                'DELETE FROM prodpcli WHERE prodpcli.k_idpedidocliente=:id',
                [pedido],
                { autoCommit: true }
            );
        };
         
        return {exe: await cnx.run(this.credenciales, sentencia)};
        
    }

    async actualizarPedidoVaciar(pedido){

        const sentencia = async function(conexion){
            return await conexion.execute(
                `UPDATE pcli 
                SET F_FECHAMODIFICACION=TO_DATE(sysdate),
                    Q_NUMEROPRODUCTOS=0,
                    V_SUBTOTAL =0,
                    V_IVA=0,
                    V_VALORTOTAL=0 
                WHERE k_idpedidocliente =: idpedido`,
                { idpedido : {val: pedido}},
                { autoCommit: true },
            );
        };
         
        return {exe: await cnx.run(this.credenciales, sentencia)};
        
    }

}

module.exports = { PedidoClienteDAO } 