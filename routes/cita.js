var express = require('express');
const citas = require('../database/citas');
const CITAS = citas.model;
const CitaSchema = citas.Schema;
var valid = require("../utils/valid");
var router = express.Router();
//var jwt = require('jsonwebtoken');
//var rols = require("../security/checkpermissions");



// INTRODUCIR DATOS

router.post('/cita', async(req, res) => {
    var params = req.body;
    params["registerdate"] = new Date();
    if (!valid.checkParams(CitaSchema, params)) {
      res.status(300).json({
        msn: "parametros incorrectos"
      });
      return;
    }
    var citas = new CITAS(params);
    var result = await citas.save();
    res.status(200).json(result);
});

// muestra todos los datos insertados
router.get("/cita",(req, res) => {
  var skip = 0;
  var limit = 10;
  if (req.query.skip != null) {
    skip = req.query.skip;
  }

  if (req.query.limit != null) {
    limit = req.query.limit;
  }
  CITAS.find({}).skip(skip).limit(limit).exec((err, docs) => {
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



//Creación del servicio de PATCH---actualiza solo un parametro.
router.patch('/cita', async(req,res) => {
  var params = req.body;
  var id = req.query.id;
  if (id == null) {
    res.status(300).json({
      msn: "falta el id del item"
    });
    return;
  }

  var validparams = user.updatekeys;
  //filtro de seguridad
  var checkParams = Object.keys(params);
  var newObject = {};
  for (var i = 0; i < validparams.length; i++) {
    for (var j = 0; j < checkParams.length; j++) {
      if (validparams[i] == checkParams[j]) {
        newObject[validparams[i]] = params[validparams[i]];
      }
    }
  }
  var citas =  await CITAS.findOneAndUpdate({_id: id}, newObject);
  res.status(200).json(users);
});


//borra los datos insertados
router.delete("/cita", async(req, res) => {
  if (req.query.id == null) {
    res.status(300).json({
      msn: "Error no existe id"
    });
    return;
  }
  var r = await CITAS.remove({_id: req.query.id});
  res.status(300).json(r);
});


module.exports = router;
