class PedidoCliente{

    constructor(fcreacion, fmodificacion, subtotal, nproductos, iva, total){
        this.fcreacion = fcreacion;
        this.fmodificacion = fmodificacion;
        this.subtotal = subtotal;
        this.nproductos = nproductos;
        this.iva = iva;
        this.total = total;
    }

}

module.exports = { PedidoCliente } 