var express       = require('express');
var app           = express();

var bodyParser    = require('body-parser');
var multer        = require('multer');
var uuid          = require('node-uuid');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require("mongoose");

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.bodyParser({ uploadDir: './public/uploads' }));

app.use(multer());

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.PASSPORT_SECRET
}));

app.use(cookieParser());


require("./public/assignment/server/app.js")(app, uuid);
require("./public/project/server/app.js")(app, uuid);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;



function saveFile(req, callback)
{
    var path = req.files.someFile.path;
    var imagePage = path;

    if (path.indexOf("\\") > -1)
        path = path.split("\\");
    else
        path = path.split("/");
    fileName = path[path.length - 1];
    var thm = 'thm_' + fileName;
}



app.post('/upload/file', function (req, res) {
    saveFile(req, function () {
        res.send(200);
        //res.redirect("/#/" + username + "/profile");
    });
});

app.listen(port, ipaddress, function () {
    console.log("Server is listening on: " + ipaddress + ":" + port);
});