var express = require("express");
var fs = require("fs");
var moviesRouter = express.Router();
var mongodb = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";

function router(menu) {
  moviesRouter.route("/").get((req, res) => {
    mongodb.connect(url, function(err, dataCollection) {
      if (err) {
        res
          .status(501)
          .send("Error occured while connecting to Mongo Database");
      } else {
        var dbo = dataCollection.db("classdatabase");
        dbo
          .collection("movies")
          .find({})
          .toArray(function(err, data) {
            if (err) {
              res
                .status(501)
                .send("Error occured while fetching data from database");
            } else {
              res.render("moviesRouter", {
                title: "Movies Page",
                movies: data,
                menu
              });
            }
          });
      }
    });
  });

   moviesRouter.route('/details/:id').get((req, res)=>{
    //   var id = req.params.id;
    var {id} = req.params;
    mongodb.connect(url, (err, dataCollection) =>{
        if(err){
            res.status(501).send('Error occured while connecting to Database');
        }else{
            var dbo = dataCollection.db('classdatabase');
            dbo.collection('movies').findOne({_id:id}, (err, data)=>{
                if(err){
                    res.status(501).send('Error occured while fetching data from database');
                }else{
                    res.render('moviesDetails',{title: 'Movies Details Page', 
                movies: data, menu})
                }
            })
        }
    })
  })

  return moviesRouter;
}

module.exports = router;
