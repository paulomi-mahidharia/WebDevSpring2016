var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var uuid          = require('node-uuid');

console.log("secret");
console.log(process.env.PASSPORT_SECRET);

app.use(bodyParser.json()); // for parsing application/json

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-

app.use(multer());

app.use(session({ secret: process.env.PASSPORT_SECRET , saveUninitialized: true, resave: true}));

app.use(cookieParser());

app.use(express.static(__dirname + '/public'));

require("./public/experiments/omdb/server/app.js")(app);
require("./public/assignment/server/app.js")(app, uuid);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get('/sayHello', rootRequest);
function rootRequest(req, res)
{
    res.send('hello world');
}

app.listen(port, ipaddress);

