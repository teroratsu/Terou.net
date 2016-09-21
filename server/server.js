/****** Require et dépendences *******/

var express = require('express');           //express
var app = express();                        //express init
var http = require('http').Server(app);     //Http server
var path = require('path');                 //path 
var nunjucks = require('nunjucks');         //templating engine
var storage = require('node-persist');      //local storage
const fs = require('fs');

/**************************************/
/********* Globales et config *********/

var client_path = path.resolve(__dirname, '../client'); //adresse du dossier client
var port = 3000;

var defaultStorage = storage.create(); //init local storage
var controllerStorage = storage.create(); //init controller storage

// Configuration Nunjucks
nunjucks.configure(['views',client_path],{
	autoescape : true,
	express : app,
    noCache  : true   //dev only. force recompile
});

app.set('view engine', 'njk');

// Configuration storages
defaultStorage.initSync({
  dir : __dirname + '/data/default',
  interval : 5000 // persist every 5s
});
controllerStorage.initSync({
  dir : __dirname + '/data/pages',
  interval : 5000 // persist every 5s
});

/**************************************/
/************** Routing ***************/

app.use(express.static(client_path + '/public'));

//get
app.get('/', ctrlIndex); //presentation page
app.get('/devroom', ctrlDev);
app.get('/galery', ctrlArt);

//post
//app.post('/', formReader.single('lobby_img'), ctrlPostNewImg);

/**************************************/
/************* Controller *************/

//generate html
/*function ctrlIndex(req, res) {
  res.render('index',{
    "_m"  : controllerStorage.getItem('index.json')
  },function(err, html) {
    fs.writeFile('render/index.html', html);
});
}*/

function ctrlIndex(req, res) {
  res.render('index',{
    "_m"  : controllerStorage.getItem('index.json'),
    "_g"  : controllerStorage.getItem('globals.json')
  });
}

function ctrlDev(req, res) {
  res.render('devroom',{
    "global"  : "global"
  });
}

function ctrlArt(req, res) {
  res.render('galery',{
    "global"  : "global"
  });
}
/**************************************/
/************** SERVER ****************/

http.listen(port, function(){
  console.log('listening on *:' + port);
});

/**************************************/
/************* Functions ***************/

/*function genUUID() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}*/

/*************************************/