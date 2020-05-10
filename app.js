//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const homeStartingContent = "This is a personal blog. You can use it as your diary.";
const aboutContent = " I didn't go through too details on CSS and stuffs. It's a Back-End Site. I'll develop further when I get time";
const contactContent = "It's developed by Dipto Chakrabarti";

const statuses=[];

const app = express();

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




app.get("/", function(req,res){
  
  res.render("home", {homeContent:homeStartingContent, diary:statuses});
});

app.get("/contact", function(req,res){
  res.render("contact", {contContent:contactContent});
});

app.get("/about", function(req,res){
  res.render("about", {abtContent:aboutContent});
});
app.get("/compose", function(req,res){
  res.render("compose", {abtContent:aboutContent});
});



app.get("/posts/:postName", function(req,res){

  const requestedTitle= _.lowerCase(req.params.postName);
 
statuses.forEach(function(status){

  if(_.lowerCase(status.title)===requestedTitle) 
  res.render ("post", {title:status.title, para:status.post});

})

});


app.post("/compose", function(req,res){
  
  const status={
    title: req.body.title,
    post: req.body.post
  }
  statuses.push(status);
  res.redirect("/");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
