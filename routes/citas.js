const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const validCitas = require('../utils/validation')
const AMIGOS = require('../database/amigos');

router.get('/', async(req,res,next)=>{
    let result = await AMIGOS.find({});
    res.status(200).json(result);
});

router.post('/', async(req,res,next)=>{
    var datos = req.body;
    datos["registerDate"] = new Date();
    datos["updateDate"] = new Date();
    if(!validCitas.checkQuantity(datos.quantity))
    {
      res.status(300).json({
          msn: "campo no valido"
      });
      return;

    }
    var quotes = new AMIGOS(datos);
    var result = await quotes.save();
    res.status(200).json(result);
});

router.delete("/", async(req, res) => {
    if (req.query.id == null) {
        res.status(300).json({
            msn: "ERROR DE ID"
        });
        return;
    }
    var result = await AMIGOS.remove({_id: req.query.id});
    res.status(200).json(result);
});

module.exports=router;
