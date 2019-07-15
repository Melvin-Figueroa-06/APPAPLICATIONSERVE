const mongoose = require("./connect");


var CitaSchema = {
  nombre        :String,

  stock         :{type: Number, default:1},
  estado        :{type:String, enum:['disponible', 'vendido']},
  fechacita     :String,
  horacita      :String,
  fecharegistro :{type: Date, default: Date.now()}
};
const CITAS = mongoose.model('citas', CitaSchema);
module.exports = {model: CITAS, Schema: CitaSchema};
