var express = require('express');
var router = express.Router();
const passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var flash = require('connect-flash');

var User =  require('../models/user.js');

router.post('/',function (req,res,next){
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
    user.save(function (err, result){
        if(err){
            console.log('500');
            return res.status(500).json({
                myErroTitle: 'Um erro aconteceu na hora de salvar o usuário',
                myError : err
            });
        }
        res.status(201).json({
            myMsgSucess: "Usuário salvo com sucesso",
            objUserSave: result
        });
    });
});

router.post('/login',function (req,res,next){
    console.log("novo qualquer coisa");
    console.log(req.body.emailT);
    var emailR = req.body.emailT;
    console.log(emailR);

    User.findOne({email: emailR},function(err,documents){
        console.log(documents);
        if(err){
            return res.status(500).json({
                myErroTitle: 'Um erro aconteceu na hora de buscar o usuário',
                myError : err
            });
        }
        if(!documents){
            return res.status(500).json({
                myErroTitle: 'Não encontrou o usuário',
                myError : {info: 'Não encontrou o usuário com o email' +emailR }
            });
        }
        var passwordT = documents.password;
        console.log(passwordT);
        if(passwordT != req.body.passwordT){
            return res.status(500).json({
                myErroTitle: 'Senha incorreta',
                myError : {info: 'Senha digitada incorretamente' +emailR }
            });
        }
        else{
            console.log('Senha correta!');
            res.status(200).json({
                myMsgSucess: "Usuário recuperado com sucesso",
                usuarioRecuperado: documents
                })
            }
    });
});

module.exports = router;