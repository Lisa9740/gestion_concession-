var mongoose = require('mongoose');

var Voiture = require("../models/voiture");

var voitureController = {};


//----------------------
// PARTIE FRONT
//----------------------

//Lister les voitures et les affiche dans la page d'accueil
voitureController.listaccueil = function(req, res) {
    Voiture.find({}).exec(function(err, voitures){
        if(err){
            console.log('Error : ', err);
        }else{
            res.render("index",{voitures:voitures} );
        } 
    });
};



//Affiche une voiture par rapport à son ID
voitureController.show = function(req, res) {
    Voiture.findOne({_id:req.params.id}).exec(function(err, voiture){
        if(err){
            console.log('Error : ', err);
        }else{
            res.render("../views/voiture/viewdetails",{voiture:voiture});
        } 
    });
};

//----------------------
// PARTIE BACK
//----------------------

//Lister les voitures et les affiche dans l'index du Back office
voitureController.list = function(req, res) {
    Voiture.find({}).exec(function(err, voitures){
        if(err){
            console.log('Error : ', err);
        }else{
            res.render("../views/voiture/admin/index",{voitures:voitures} );
        } 
    });
};
//Redirection vers la page de creation d'une voiture
voitureController.create = function(req, res){
    res.render("../views/voiture/admin/create");
}; 

//Enregistrement d'une voiture
voitureController.save = function(req, res){
    var voiture = new Voiture(req.body);

    voiture.save(function(err){
        if(err){
            console.log(err);
            res.render("../views/voiture/admin/create");
        } else{
            console.log("creation voiture OK");
            res.redirect("/voitures");
        } 
    });
};

//Edition d'un voiture par son id
voitureController.edit = function(req, res){
    var voiture = new Voiture(req.body);

    Voiture.findOne({_id:req.params.id}).exec(function(err, voiture){
        if(err){
            console.log("Error ", err);
        } else{
            res.render("../views/voiture/admin/edit",{voiture: voiture} );
        } 
    });
};

//Gestion de l'edition dun voiture
voitureController.update = function(req, res){
    Voiture.findByIdAndUpdate(req.params.id,{ $set :{nom: req.body.nom, prix: req.body.prix} },{new: true}, function (err, voiture){

        if (err){
            console.log(err);
            res.render("../views/voiture/admin/edit",{voiture:req.body} );
        } 
        res.redirect("/voitures/admin");
        
    });
};

//Export du module
module.exports = voitureController;
