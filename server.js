var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var session = require("express-session");
var Router = require('react-router');
var config = require('./server/config');

//controllers
var AuthController = require("./server/controllers/auth-controller");
var PusherController = require("./server/controllers/pusher-controller");
var CallsController = require("./server/controllers/calls-controller");

//Express request pipeline
var app = express();
app.env = app.get('env');
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}))
app.use(express.static(path.join(__dirname, "dist")));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use("/api", AuthController);
app.use("/api", PusherController);
app.use("/api", CallsController);
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(7777, function () {
    console.log("Started listening on port", 7777);
});

// Connect to mongodb database
mongoose.connect("mongodb://localhost/presence");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});