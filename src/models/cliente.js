class Cliente {

    constructor(tipo,cedula, nombre, fechanac, genero, email,usuario){
        this.tipo = tipo;
        this.usuario = usuario;
        this.cedula = cedula;
        this.nombre = nombre;
        this.fechanac = fechanac;
        this.genero = genero;
        this.email = email;
    }

}

module.exports = { Cliente } 