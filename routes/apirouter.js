var express = require('express');
var sha1 = require('sha1');
const user = require('../database/users');
const USER = user.model;
const USERSCHEMA = user.Schema;
var valid = require("../utils/valid");
var router = express.Router();
var jwt = require('jsonwebtoken');

var rols = require("../security/checkpermissions");
var verifytoken = rols.verifytoken;
//var express = require('socket.io');

//io = require('socket.io').listen(server);


//------------------------------------

//Login USER

router.post("/login", async (req, res, next) => {
  var params = req.body;
  if (!valid.checkParams({"email": String, "password": String}, params)) {
    res.status(300).json({"msn": "Error de Parametros Incorrectos"});
    return;
  }
  var password = sha1(params.password);
  var docs = await USER.find({email: params.email, password:password});
  if (docs.length == 0) {
    res.status(300).json({"msn": "Error usuario no registrado"});
    return;
  }
  if (docs.length == 1) {
    jwt.sign({name: params.email, password: params.password}, "password", (err, token) => {
      if (err) {
        res.status(300).json({"msn": "Error dentro del JWT"});
        return;
      }
      res.status(200).json({"token": token});
    });
    return;
  }
});

//logout
	router.post("/logout", (req, res) => {
		res.clearCookie('login');
		req.session.destroy(function(e){ res.status(200).send('ok'); });
	});


//INSERCION DE DATOS

router.post('/user', async(req,res) => {
  var params = req.body;
  params["registerdate"] = new Date();
  params["roles"] = ["list"];
  if (!valid.checkParams(USERSCHEMA, params)) {
    res.status(300).json({
      msn: "parametros incorrectos"
    });
    return;
  }
  if (!valid.checkEmail(params.email)) {
    res.status(300).json({
      msn: "Email Invalido"
    });
    return;
  }
  params["password"] = sha1(params["password"]);
  var users = new USER(params);
  var result = await users.save();
  res.status(200).json(result);
});

//Creación del servicio de GET mostrar.

router.get('/:id', function(req, res, next) {

  USER.findById(req.params.id,"-password")
  .exec(function (err, doc) {
    if (err) {
      res.json({error:err.message})
    }
    res.json(doc)
  });
});

/*
router.get("/user", verifytoken, async (req, res, next) => {
  var params = req.query;
  console.log(params);
  var limit = 100;
  if (params.limit != null) {
    limit = parseInt(params.limit);
  }
  var order =-1;
  if(params.order != null) {
    if(params.order == "desc") {
      order = -1;
    }else if (params.order == "asc"){
      order = 1;
    }
  }
  var filter = {};
  if (params.id != null) {
    filter = {_id: params.id};
    console.log(filter);
  }

  var skip = 0;
  if (params.skip != null) {
    skip = parseInt(params.skip);
  }
  USER.find({}).limit(limit).sort({_id: order}).skip(skip).exec((err, docs) => {
    res.status(200).json(docs);
  });
});
*/

//actualiza todo los parametros
router.put('/user:id', async(req,res) => {
  var params = req.body;
  var id = req.query.id;
  if (id == null) {
    res.status(300).json({
      msn: "falta el id del item"
    });
    return;
  }
  params["registerdate"] = new Date();
  if (!valid.checkParams(USERSCHEMA, params)) {
    res.status(300).json({
      msn: "parametros incorrectos"
    });
    return;
  }
  if (!valid.checkEmail(params.email)) {
    res.status(300).json({
      msn: "Email Invalido"
    });
    return;
  }
  delete params.registerdate;
  var result =  await USER.findOneAndUpdate({_id: id}, params);
  res.status(200).json(result);
});

//Creación del servicio de PATCH---actualiza solo un parametro.

router.patch('/user', async(req,res) => {
  var params = req.body;
  var id = req.query.id;
  if (id == null) {
    res.status(300).json({
      msn: "falta el id del item"
    });
    return;
  }
  /*if (params.email != null) {
    res.status(300).json({
      msn: "No puedes actualizar tu email"
    });
    return;
  }*/
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
  if (newObject.email != null && !valid.checkEmail(newObject.email)) {
    res.status(300).json({
      msn: "Email Invalido"
    });
    return;
  }
  if (newObject.password != null && !valid.checkPassword(newObject.password)) {
    res.status(300).json({
      msn: "Password Invalido"
    });
    return;
  }
  if (newObject.password != null) {
    newObject["password"] = sha1(newObject["password"]);
  }
  var users =  await USER.findOneAndUpdate({_id: id}, newObject);
  res.status(200).json(users);
});


//Creación del servicio DELETE
router.delete("/user", async(req, res) => {
  if (req.query.id == null) {
    res.status(300).json({
      msn: "Error no existe id"
    });
    return;
  }
  var r = await USER.remove({_id: req.query.id});
  res.status(300).json(r);
});




//chat

/*
io.on('connection', (socket) => {
  console.log('user connected')
socket.on('join', function(userNickname) {
        console.log(userNickname +" : has joined the chat "  );
        socket.broadcast.emit('userjoinedthechat',userNickname +" : has joined the chat ");
    });
    socket.on('messagedetection', (senderNickname,messageContent) => {
       //log the message in console
       console.log(senderNickname+" :" +messageContent)
        //create a message object
       let  message = {"message":messageContent, "senderNickname":senderNickname}
          // send the message to the client side
       io.emit('message', message );
      });
      socket.on('disconnect', function() {
        console.log( ' user has left ')
        socket.broadcast.emit("userdisconnect"," user has left ")
      });
});
*/


module.exports = router;
