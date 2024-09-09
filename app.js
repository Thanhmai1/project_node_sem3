var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var setViewPath = require('./middlewares/setViewPath');

mongoose.connect('mongodb://localhost/admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

var indexRouter = require('./routes/index');
var usersRouter = require('./admin/routes/userRoutes');

var dishRouter = require('./admin/routes/dishRoutes')

var app = express();
// app.set('views', path.join(__dirname, 'views'));
app.set('views', [
  path.join(__dirname, 'admin', 'views'),
  path.join(__dirname, 'views')
]);
app.set('view engine', 'ejs');
//set rounter cho admin user
app.use('/users', setViewPath(path.join(__dirname, '/admin/views')));
app.use('/dish', setViewPath(path.join(__dirname, '/admin/views/dishes')));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Để hỗ trợ PUT và DELETE
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dish', dishRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
