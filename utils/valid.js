var USER = require('../database/users');
var CITA = require('../database/citas');

var valid = {

  checkParams: function(refobj, evalueobj) {
    if (Object.keys(refobj).sort().toString() == Object.keys(evalueobj).sort().toString()){
      return true;
    }
    return false;
  },
//Para verificar una contraseña de entre 7 y 15 caracteres que contenga al menos un dígito numérico y un carácter especial
  checkPassword: function (password) {
    var password=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if(inputtxt.value.match(password)) {
      alert('Correcto,')
      return true;
    }
    else{
      alert('error')
      return false;
    }

    },
  checkEmail: function(email) {
    var exp = /^\w{1,}@\w{1,}[.]\w{2,3}$/g;
    if(email.match(exp) == null){
      return false;
    }
    return true;
  }
};
module.exports = valid;
