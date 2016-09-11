"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var service = require("myclinic-service");
var config = require("./test-config/service-config");

var app = express();
var serviceApp = express();
serviceApp.use(bodyParser.urlencoded({extended: false}));
serviceApp.use(bodyParser.json());
service.initApp(serviceApp, config);
app.use("/service", serviceApp);
app.get("/test-bundle.js", function(req, res){
	res.sendFile(__dirname + "/test-bundle.js");
});
app.get("/", function(req, res){
	res.sendFile(__dirname + "/test.html");
});

var port = 8081;
app.listen(port, function(){
	console.log("server listening to " + 8081);
})
