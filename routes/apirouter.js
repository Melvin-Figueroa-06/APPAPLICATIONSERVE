var express = require('express');
var router = express.Router();
var USER = require('../database/users');
//var express = require('socket.io');

//io = require('socket.io').listen(server);


router.post('/user', async(req,res) => {
  var params = req.body;
  params["registerdate"] = new Date();
  var users = new USER(params);
  var result = await users.save();
  res.status(200).json(result);
});

//Creación del servicio de GET mostrar.
router.get("/user", (req, res) => {
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
  var skip = 0;
  if (params.skip != null) {
    skip = parseInt(params.skip);
  }
  USER.find({}).limit(limit).sort({_id: order}).skip(skip).exec((err, docs) => {
    res.status(200).json(docs);
  });
});

//Creación del servicio de GET PATCH.
router.patch("/user", (req, res) => {
  if (req.query.id == null) {
    res.status(300).json({
      msn: "Error no existe id"
    });
    return;
    }
    var id = req.query.id;
    var params = req.body;
    USER.findOneAndUpdate({_id: id}, params, (err, docs) => {
      res.status(200).json(docs);
    });
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


/*
Login USER
*/
router.post("/login", (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  var result = Cliente.findOne({email: email,password: password}).exec((err, doc) => {
    if (err) {
      res.status(300).json({
        msn : "No se puede concretar con la peticion "
      });
      return;
    }
    console.log(doc);
    if (doc) {
       console.log(result);
      //res.status(200).json(doc);
      jwt.sign({name: doc.email, password: doc.password}, "secretkey123", (err, token) => {
          console.log(result);
          res.status(200).json({
            resp:200,
            token : token,
            dato:doc
          });
      })
    } else {
      res.status(400).json({
        resp: 400,
        msn : "El usuario no existe en la base de datos"
      });
    }
  });
});

//Middelware
function verifytoken (req, res, next) {
  //Recuperar el header
  const header = req.headers["authorization"];
  if (header  == undefined) {
      res.status(403).json({
        msn: "No autorizado"
      })
  } else {
      req.token = header.split(" ")[1];
      jwt.verify(req.token, "secretkey123", (err, authData) => {
        if (err) {
          res.status(403).json({
            msn: "No autorizado"
          })
        } else {
          next();
        }
      });
  }
}



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
