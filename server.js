const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const morgan = require('morgan');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const connect = require("./config/db");

connect();
app.use(express.static('assets'));
app.set("view-engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));


// app.set('trust proxy', 1) ;
app.use(
  session({
    secret: "hc",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

// Main Todo Controller

var m = require("./controller/main");
var main = m.main;
var getDocs = m.getDocs;
var getDocsD = m.getDocsD;
var createDoc = m.createDoc;
var deleteDoc = m.deleteDoc;
var updateDoc = m.updateDoc;
var searchDocs =  m.searchDoc; 
// var delAll = m.deleteAllDoc;
var todoVar = main(mongoose);

// Main user Controller

var u = require("./controller/user");
var us = u.user;
var userReg = u.registerUser;
var userDel = u.deleteUser;
var userSign = u.signUser;
var emailExist = u.isExist;
var user = us(mongoose);

// Main Todo Route File

var route = require('./routes/main');
var homeRoute = route.home;
var sortRoute = route.sortTodo;
var addRoute = route.addTodo;
var deleteRoute = route.deleteTodo;
var updateRoute = route.updateTodo;
var searchRoute = route.searchIt;

// Main User Route File

var rout = require('./routes/user');
var regRoute = rout.regGet;
var regPRoute = rout.regPost;
var login = rout.login;
var logGet = rout.logget;
var logout = rout.logout;

// Middleware for user Logged in

var userMid = require('./middleware/user');
var userAuth = userMid.userAuth;
var userRedirect = userMid.userRedirect;

app.use(express.json());

app.use(morgan('dev'));


// Todo route Path

app.get("/", userAuth ,function (req, res) {
  homeRoute(req,res,getDocs,todoVar);
});

app.post("/search", userAuth ,function (req, res) {
  // res.json(req.body.search);
  searchRoute(req,res,searchDocs,todoVar);
});

app.post("/dec", function (req, res) {
  sortRoute(req,res,getDocsD,todoVar);
});

app.post("/add", function (req, res) {
  addRoute(req,res,createDoc,todoVar);
});

app.post("/" , function (req, res) {
    console.log(req.body);
    deleteRoute(req,res,deleteDoc,todoVar);
  
});

app.post("/update" , function (req, res) {
  updateRoute(req,res,updateDoc,todoVar);
});

// User Registration Route Path

app.get("/register",userRedirect, function (req, res) {
  regRoute(req,res);
});

app.post("/register",userRedirect, function (req, res) {
  regPRoute(req,res,emailExist,userReg,user);  
});

app.post("/login",userRedirect, function (req, res) {
  login(req,res,emailExist,userSign,getDocs,todoVar,user);
});

app.get("/login",userRedirect, function (req, res) {
  logGet(req,res);
});

app.get("/logout", function (req, res) {
    logout(res,req);
});

// Global Middleware For 404 request

app.use((req,res) => {
  res.status(404).render('404.ejs',{title:"404", data:"Sorry, page not Found"});
});

// listen for requests

app.listen(port, () => {
  console.log("Server is listening on port 3000");
});












// app.get("/delete", async function (req, res) {
//   try {
//     const del1 = userDel(user, req.session.uuid);
//     const del2 = delAll(todoVar, req.session.uuid);
//     return res.redirect("/register");
//   } catch (err) {
//     console.log(err);
//     return res.redirect("/register");
//   }
// });