const mongoose = require("./connect");

//var posibles_valores = {"M","F"};

var USERSCHEMA = {
  name        :String,
  email       :String,
  //email       :{type: String, required: "El correo es obilgatorio"},
  password    :String,
  //password    :{type: String,minlength:[8, "El password es muy corto"]},
  registerdate:Date,
  sex         :String,
//  sex         :{type: String,enum:posibles_valores},
  address     :String
  }
const USERS = mongoose.model("users", USERSCHEMA);
module.exports = {model: USERS, Schema: USERSCHEMA};
