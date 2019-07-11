const mongoose = require('mongoose');
mongoose.connect("mongodb://172.21.0.2:27017/APPAPLICATION",{
  useNewUrlParser: true
}). then(() => {
  console.log('conexion exitosa a mongodb');
}).catch(err => {
  console.log('Error en la conexion a mongodb');
});



module.exports = mongoose;
