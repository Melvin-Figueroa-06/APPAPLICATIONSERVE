const mongoose = require("./connect");

//var posibles_valores = {"M","F"};

var USERSCHEMA = {
  name          :{type:String,required: [true, 'Introzca su nombre']},
  //email       :String,
  email         :{type: String,required: "El correo es obilgatorio"},
  //password    :String,
  password      :{type: String, minlength:[8, "El password es muy corto"]},
  registerdate  :{type: Date, defautl: Date.now()},
  address       :String,
  tipo          :{type:String, enum:['Comprador', 'Vendedor']},
  roles         :Array
  }
const USERS = mongoose.model("users", USERSCHEMA);
module.exports = {model: USERS, Schema: USERSCHEMA};
