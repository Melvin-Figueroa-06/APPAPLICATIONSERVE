var express = require('express');
const citas = require('../database/citas');
const CITAS = citas.model;
const CitaSchema = citas.Schema;
var valid = require("../utils/valid");
var router = express.Router();
//var rols = require("../security/checkpermissions");




router.post('/cita', async(req, res) => {
var params = req.body;
params["registerdate"] = new Date();
var citas = new CITAS(params);
var result = await citas.save();
res.status(200).json(result);
});

module.exports = router;
