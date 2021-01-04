const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const morgan = require('morgan');
const mongoose = require('mongoose');
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

// var m = require("./controller/main1");
// var main = m.main;
// var getDocs = m.getDocs;
// var createDoc = m.createDoc;
// var deleteDoc = m.deleteDoc;
// var updateDoc = m.updateDoc;
// // var delAll = m.deleteAllDoc;
// var todoVar = main(mongoose);

// Main user Controller

var u = require("./controller/user");
var us = u.user;
var userReg = u.registerUser;
var userDel = u.deleteUser;
var userSign = u.signUser;
var emailExist = u.isExist;
var user = us(mongoose);

var data = [
  {
    email: "hnghnbjhb",
    password: "nvvbvhjnb",
  },
  {
    email: 'hghhgjhgjhgj',
      password: 'jhgvhjghb',
  }
];
user.insertMany(data, function(err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});



// Main Todo Route File

// var route = require('./routes/main');
// var homeRoute = route.home;
// var addRoute = route.addTodo;
// var deleteRoute = route.deleteTodo;
// var updateRoute = route.updateTodo;

// // Main User Route File

// var rout = require('./routes/user');
// var regRoute = rout.regGet;
// var regPRoute = rout.regPost;
// var login = rout.login;
// var logout = rout.logout;

// // Middleware for user Logged in

// var userMid = require('./middleware/user');
// var userAuth = userMid.userAuth;
// var userRedirect = userMid.userRedirect;




