var USER = require('../database/users');

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
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
};
module.exports = valid;
