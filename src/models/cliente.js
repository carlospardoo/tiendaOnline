class Cliente {

    constructor(id,tipo,cedula, nombre, fechanac, genero, email,usuario,ciudad){
        this.tipo = tipo;
        this.usuario = usuario;
        this.cedula = cedula;
        this.nombre = nombre;
        this.fechanac = fechanac;
        this.genero = genero;
        this.email = email;
        this.ciudad = ciudad;
        this.id=id;
    }

}

module.exports = { Cliente } 