const mongoose = require("../connect");
const Schema = mongoose.Schema;

var publicacionSchema = Schema({

    vendedor      :{type: Schema.Types.ObjectId, required: 'Falta informacion'},
    nombre        :String,
    precio        :{type: Number, required: 'Debe tener un precio'},
    descripcion   :String,
    stock         :{type: Number, default:1},
    estado        :{type:String, default:desponible, enum:['disponible', 'vendido']},
    categoria     :{type:String, enum:['casas', 'ropa', 'autos', 'servicios']},
    fechaRegistro :{type: Date, default: Date.now()},
    foto          : String
})
//Nombre, precio, descripción, fechaderegistro, fotografía del producto

const menus = mongoose.model("publicacion", menusSchema);
module.exports = menus;
