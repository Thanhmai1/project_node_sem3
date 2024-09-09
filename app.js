var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var setViewPath = require('./middlewares/setViewPath');

// Cấu hình multer để lưu file
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage });

// Kết nối MongoDB
mongoose.connect('mongodb://localhost/admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import các routes
var indexRouter = require('./routes/index');
var usersRouter = require('./admin/routes/userRoutes');
var adminRouter = require('./admin/routes/admin_layout');
var dishRouter = require('./admin/routes/dishRoutes');

var app = express();

// Cấu hình thư mục views
app.set('views', [
    path.join(__dirname, 'admin', 'views'),
    path.join(__dirname, 'views')
]);
app.set('view engine', 'ejs');

// Thiết lập route cho admin
app.use('/admin', setViewPath(path.join(__dirname, 'admin/views')));

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Hỗ trợ PUT và DELETE
app.use(express.static(path.join(__dirname, 'public')));
<<<<<<< HEAD
=======
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dish', dishRouter);
>>>>>>> 0e28d1e8dcba1eeb577a0f47d63fecc95c143711

// Định nghĩa các route
app.use('/', indexRouter);
app.use('/admin/users', usersRouter);
app.use('/admin/dish', dishRouter);
app.use('/admin', adminRouter);

// Xử lý lỗi 404
app.use(function(req, res, next) {
    next(createError(404));
});

<<<<<<< HEAD
// Xử lý các lỗi khác
=======
app.get('/recipe', (req, res) => {
  res.render('recipe'); // This renders recipe.ejs
});


// error handler
>>>>>>> 0e28d1e8dcba1eeb577a0f47d63fecc95c143711
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
