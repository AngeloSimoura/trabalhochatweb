var express = require('express');
var router = express.Router();

var Message = require('../models/message.js');

router.get('/',function (req,res,next){
    Message.aggregate([{$lookup:{from: "users",localField: "user",foreignField: "_id",as:"teste"}},{$unwind: "$teste"},{$project:{"_id":1,"content":1,"teste._id":1,"teste.firstName":1,"teste.lastName":1}}])
        .exec(function(err,result){
            if(err){
                return res.status(500).json({
                    myErroTitle: 'Um erro aconteceu na hora de buscar a mensagem',
                    myError : err
                });
            }
            else{
                res.status(200).json({
                    myMsgSucess: "Mensagem recuperada com sucesso",
                    objSMessageSRecuperadoS: result
                });
            }             
        });
});

router.post('/',function (req,res,next){
    var userID = req.body.userID;
    //console.log(userID);
    let message = new Message({
        content: req.body.content,
        user: userID
    });
    console.log("!"+message);
    message.save(function (err, result){
         if(err){
             return res.status(500).json({
                 myErroTitle: 'Um erro aconteceu na hora de salvar',
                 myError : err
             });
         }
         res.status(201).json({
             myMsgSucess: "Mensagem salva com sucesso",
             objMessageSave: result
         });
    });
});

router.delete('/:id',function (req,res,next){
    Message.findById(req.params.id, function(err, resultMsgRecuperada){
        if(err){
             return res.status(500).json({
                 myErroTitle: 'Um erro aconteceu na hora de buscar a msg pelo ID p/ deletar',
                 myError : err
             });
        }
        if(!resultMsgRecuperada){
            return res.status(500).json({
                myErroTitle: 'Não encontrou a msg para deletar',
                myError : {info: 'Não encontrou a msg para deletar com o ID' +req.params.id }
            });
        }
        resultMsgRecuperada.remove(function (err, resultMsgDeletada){
            if(err){
                return res.status(500).json({
                    myErroTitle: 'Um erro aconteceu na hora de deletar a msg',
                    myError : err
                });
            }
            res.status(201).json({
                myMsgSucess: "Mensagem deletada com sucesso",
                objMessageApagada: resultMsgDeletada
            });
        });
    });
}); 

router.patch('/:id',function(req,res,next){
    Message.findById(req.params.id, function(err,resultMsgRecuperada){
        if(err){
            return res.status(500).json({
                myErroTitle: 'Um erro aconteceu na buscar a msg pelo ID',
                myError : err
            });
        }
        if(!resultMsgRecuperada){
            return res.status(500).json({
                myErroTitle: 'Não encontrou a msg',
                myError : {info: 'Não encontrou a msg com o ID' +req.params.id }
            });
        }
        resultMsgRecuperada.content = req.body.content;
        resultMsgRecuperada.save(function (err, resultMsgAlterada){
            if(err){
                return res.status(500).json({
                    myErroTitle: 'Um erro aconteceu na hora de alterar a msg',
                    myError : err
                });
            }
            res.status(200).json({
                myMsgSucess: "Mensagem atualizada com sucesso",
                objMessageAtualizado: resultMsgAlterada
            });
        });
    });
});

module.exports = router;