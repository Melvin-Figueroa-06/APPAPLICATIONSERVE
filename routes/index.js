var express = require('express');
var router = express.Router();
const methodOverride = require('method-override');
const session = require('express-session');
var jwt = require("jsonwebtoken");
const multer = require('multer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




const storage = multer.diskStorage({
  destination: function (res, file, cb) {
      try {
          fs.statSync('./public/avatars');
      } catch (e) {
          fs.mkdirSync('./public/avatars');
      }

      cb(null, './public/avatars');
  },
  filename: (res, file, cb) => {

      cb(null, 'IMG-' + Date.now() + path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      return cb(null, true);
  }
  return cb(new Error('Solo se admiten imagenes png y jpg jpeg'));
}

const upload = multer({
  storage: storage,
})

/*
//MIdddlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('method'));
app.use(session({
  secret: 'mysecretapp',
  resave: true,
  saveUninitialized: true,
}));*/
module.exports = router;
