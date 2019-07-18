var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

http = require('http');
server = http.createServer(app),
io = require('socket.io').listen(server);



//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var apireRouter = require('./routes/apirouter');
var publicacion = require('./routes/publicacion');
var productoRouter = require('./routes/productos');
var usuarioRouter = require('./routes/usuario');
var seguidosRouter = require('./routes/seguidos');
var personaRouter = require('./routes/persona');
var mensajeRouter = require('./routes/mensajes');
var favoritoRouter = require('./routes/favorito');
var citasRouter = require('./routes/citas');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/v1.0/api',apireRouter);
app.use('/v1.0/api', publicacion);

app.use('/producto', productoRouter);
app.use('/usuario', usuarioRouter);
app.use('/seguidos', seguidosRouter);
app.use('/persona', personaRouter);
app.use('/mensajes', mensajeRouter);
app.use('/favorito', favoritoRouter);
app.use('/citas', citasRouter);
//app.use('/', indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = 8000;
app.listen(port, () => {
  console.log("Corriendo en el puerto " + port)
});


module.exports = app;
