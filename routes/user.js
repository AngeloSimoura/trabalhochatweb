var express = require('express');
var router = express.Router();

var User =  require('../models/user.js');

router.post('/',function (req,res,next){
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
    console.log(user);
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

module.exports = router;