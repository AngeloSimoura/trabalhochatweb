
var express = require('express');
var router = express.Router();


var User = require('../models/user');
var Registro = require('../models/registro-user');

router.post('/registro-usuario-salvar', function (req, res, next) {
    var nameVar = req.body.nameBody;
    var usernameVar = req.body.usernameBody;
    var emailVar = req.body.emailBody;
    var passwordVar = req.body.passwordBody;

    var registroObject = new Registro ({
    name: nameVar,
    username: usernameVar,
    email: emailVar,
    password: passwordVar
    });
    registroObject.save();

    //res.redirect('/registro-usuario-busca');
});

router.get('/registro-usuario-salvar', function (req, res, next) {
    res.render('registro');
});

router.get('/registro-usuario-busca/:msgParam', function (req, res, next) {
    var chavebuscaVar = req.params.msgParam;    
    Registro.findOne({email: chavebuscaVar}, function (err,documents) {
        if(err){
            return res.send('Errrooouuuuu!');
        }
        res.render('node',{firstNameV :documents.firstName,
                           lastNameV: documents.lastName,
                           passwordV: documents.password,
                           emailV: documents.email,
                           messagesV: documents.message
        });
    });
});

router.get('/node-mongodb-mongoose-user', function (req, res, next) {
    res.render('node');
});

router.post('/node-mongodb-mongoose-user', function (req, res, next) {
    var emailVar = req.body.emailBody;
    var userObject = new User ({
    firstName: 'Angelo',
    lastName: 'Simoura',
    password: 'segredo',
    email: emailVar
    });
    userObject.save();

    res.redirect('/node-mongodb-mongoose-user');
});

router.get('/node-mongodb-mongoose-user-busca', function (req, res, next) {
    User.findOne({},function(err,documents){
        if(err){
            return res.send('Errrooouuuuu!');
        }
        res.render('node',{firstNameV :documents.firstName,
                           lastNameV: documents.lastName,
                           passwordV: documents.password,
                           emailV: documents.email,
                           messagesV: documents.message
        });
    });
});

router.get('/', function (req, res, next) {
    res.render('index');
});

router.post('/message', function (req, res, next) {
    var messageVar = req.body.messageBody;
    res.redirect('/message/'+ messageVar);
});

router.get('/message/:msgParam', function (req, res, next) {
    res.render('node',{message: req.params.msgParam});
});
module.exports = router;




