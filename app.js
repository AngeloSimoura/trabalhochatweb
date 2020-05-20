var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const passport = require("./passport/setup");

var mongoose = require('mongoose');

var appRoutes = require('./routes/app');
var messageRoutes = require('./routes/messages');
var userRoutes = require('./routes/user');

var app = express();

mongoose.connect('mongodb://127.0.0.1:27017/node-angular', { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
     console.log('Conectado ao mongodb');
 }).catch((err) => {
     console.log('Erro ao se conectar ao banco de dados: ' + err);
});

mongoose.set('useCreateIndex', true);


//mongoose.connect('mongodb+srv://angelosimoura:angeloMongo@cluster0-gxzky.mongodb.net/test?retryWrites=true&w=majority');


mongoose.connection.on('error', err => {
    logError(err);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/message',messageRoutes);
app.use('/user', userRoutes);

app.use('/',appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
