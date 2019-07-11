var express = require('express');
var router = express.Router();
var USER = require('../database/publicacion');

router.post("/publicacion", (req, res) => {

  //validacion
  var data = req.body;
  data ["registerdate"] = new Date();
  var newpublicacion = new Publicacion(data);
  newpublicacion.save().then((rr) =>{
    res.status(200).json({
      "resp": 200,
      "dato": newpublicacion,
      "id" : rr._id,
      "msn" :  "publicacion agregado con exito"
    });
  });
});
router.get("/publicacion",(req, res) => {
  var skip = 0;
  var limit = 10;
  if (req.query.skip != null) {
    skip = req.query.skip;
  }

  if (req.query.limit != null) {
    limit = req.query.limit;
  }
  Publicacion.find({}).skip(skip).limit(limit).exec((err, docs) => {
    if (err) {
      res.status(500).json({
        "msn" : "Error en la db"
      });
      return;
    }
    res.json({
      result : docs
    });
  });
});

router.get(/publicacion\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Publicacion.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(400).json({
      "respuesta":400,
      "msn" : "No existe el recurso seleccionado "
    });
  })
});

router.delete('/publicacion/:id', (req, res,) => {
  var idPublicacion = req.params.id;

  Publicacion.findByIdAndRemove(idPublicacion).exec()
      .then(() => {

      res.status(200).json({
        "resp": 200,
        "msn" :  "eliminado con exito"
      });
      }).catch(err => {
          res.status(500).json({
              error: err

            });

      });


});

//Actualizar solo x elementos

router.patch("/publicacion",(req, res) => {
  var params = req.body;
  var id = req.query.id;
  //database
  var keys = Object.keys(params);
  var updatekeys = ["nombre", "precio", "descripcion", "foto"];
  var newkeys = [];
  var values = [];
  //seguridad
  for (var i  = 0; i < updatekeys.length; i++) {
    var index = keys.indexOf(updatekeys[i]);
    if (index != -1) {
        newkeys.push(keys[index]);
        values.push(params[keys[index]]);
    }
  }
  var objupdate = {}
  for (var i  = 0; i < newkeys.length; i++) {
      objupdate[newkeys[i]] = values[i];
  }
  console.log(objupdate);
  Publicacion.findOneAndUpdate({_id: id}, objupdate ,(err, docs) => {
    if (err) {
      res.status(500).json({
          msn: "Existe un error en la base de datos"
      });
      return;
    }
    res.status(200).json({
      "resp": 200,
      "dato": publicacion,
      "msn" :  "Publicacion editado con exito"
    });
    return;

  });
});
module.exports = router;
