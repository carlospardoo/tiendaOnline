var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios_routes');
var ciudadesRouter = require('./routes/ciudades_routes');
var categoriasRouter = require('./routes/categorias_routes');
var catalogoRouter = require('./routes/catalogo_routes');
var pedidoClienteRouter = require('./routes/pedidocliente_routes');
var direccionesRouter = require('./routes/direccion_routes');//

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/ciudades', ciudadesRouter);
app.use('/categorias', categoriasRouter);
app.use('/catalogo', catalogoRouter);
app.use('/pedidocliente', pedidoClienteRouter);
app.use('/direccion', direccionesRouter);

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

module.exports = app;
