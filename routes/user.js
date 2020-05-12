var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User =  require('../models/user.js');

router.post('/',function (req,res,next){
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
    console.log("aquiii");

    user.save(function (err, result){
        if(err){
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

/*router.post('/',function(req, res, next) {
    let firstName=  req.body.firstName;
    let lastName= req.body.lastName;
    let email=  req.body.email;
    let password= req.body.password;
    
    console.log(firstName);
  
    // Check Errors
    var errors = req.validationErrors();
  
    var newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    });
    User.createUser(newUser, function(err, user){
        if(err) throw err;
        console.log(user);
    });
  
    req.flash('success', 'Você está cadastrado e pronto para logar!!');
    res.location('/');
    res.redirect('/');
  });*/

module.exports = router;