const cnx = require('../modules/conexion');

class ProductoDAO{

    constructor(credenciales){
        this.credenciales = credenciales;
    }

    async consultarProductos(ciudad, producto, categoria, criterioOrden){

        let consulta = `SELECT prod.k_idreferenciaunica, prod.n_nombre, prod.n_marca, prod.k_idcategoria, ctgh.n_nombre, ctgh.k_idcategoriapadre, ctgp.n_nombre, prod.n_unidadmedida, prod.l_imagen, inv.q_cantidad, inv.v_precio, ciu.k_idciudad, ciu.n_nombre  
        FROM prod, ctg ctgh, ctg ctgp, inv, ciu 
        WHERE prod.k_idcategoria = ctgh.k_idcategoria AND ctgh.k_idcategoriapadre = ctgp.k_idcategoria AND prod.k_idreferenciaunica = inv.k_idreferenciaunica AND inv.k_idciudad = ciu.k_idciudad AND inv.k_idciudad = :idciu`
        let variables = { idciu : {val: ciudad }};

        if(producto!=null){
            consulta += ` AND UPPER(prod.n_nombre) LIKE CONCAT(CONCAT('%',:nprod),'%')`;
            variables.nprod = {val: producto.toUpperCase()};
        }

        if(categoria!=null){
            consulta += ` AND (prod.k_idcategoria = :idctg OR ctgh.k_idcategoriapadre = :idctg)`;
            variables.idctg = {val: categoria};
        }

        if(criterioOrden=='nombre'){
            consulta += ` ORDER BY prod.n_nombre`;
        }

        if(criterioOrden=='precio'){
            consulta += ` ORDER BY inv.v_precio`;
        }
        
        if(criterioOrden=='marca'){
            consulta += ` ORDER BY prod.n_marca`;
        }

        const sentencia = async function(conexion){
            return await conexion.execute(
                consulta,
                variables
            );
        };

        return {exe: await cnx.run(this.credenciales, sentencia)};

    }

}

module.exports = { ProductoDAO }