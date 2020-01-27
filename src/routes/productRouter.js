var express = require("express");
var fs = require("fs");
var productRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

function router(menu) {
  productRouter.route("/").get((req, res) => {
    mongodb.connect(url, (err, dataCollection) =>{
      if(err){
        res.status(501).send('Error occured while connecting to Mongo Database')
      }else{
        var dbo = dataCollection.db('classdatabase');
        dbo.collection('products').find({}).toArray((err, data) => {
          if(err){
            res.status(501).send('Error fetching data from Database');
          }else{
            res.render('productsRouter', {title: 'Products Page', products: data, menu})
          }
        })
      }
    })
  });

  productRouter.route("/details/:id").get((req, res) => {
    var {id} = req.params;
    mongodb.connect(url, (err, dataCollection)=>{
      if(err){
        res.status(501).send('Error occured while connecting to database');
      }else{
        var dbo = dataCollection.db('classdatabase');
        dbo.collection('products').findOne({_id: id}, (err,data)=>{
          if(err){
            res.status(501).send('Error occured while fetching data from database');
          }else{
            res.render('productDetails', {title: 'Product Details Page', products: data, menu})
          }
        })

      }
    })
    // res.send("This is Product Details page");
  });

  return productRouter;
}

module.exports = router;
