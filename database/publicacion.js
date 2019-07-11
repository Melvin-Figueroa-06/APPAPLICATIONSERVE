const mongoose = require("../connect");
const Schema = mongoose.Schema;

var publicacionSchema = Schema({

    nombre: String,
    precio: {
        type: Number
    },
    descripcion: String,
    fechaRegistro: {
        type: Date,
        default: Date.now()
    },
    foto: String
})
//Nombre, precio, descripción, fechaderegistro, fotografía del producto

const menus = mongoose.model("publicacion", menusSchema);
module.exports = menus;
