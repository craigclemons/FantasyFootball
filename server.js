var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');

var players = [];
var id = 0;

var updateId = function(req, res, next){
    id = req.body.id;
    id++;
};

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.param('id', function(req, res, next,id){
    var player = _.find(players, {id: id});
    
    if (player){
        req.player = player;
        next();
    }
    else{
        res.send();
    }
});

app.get('/players', function(req, res){
    res.json(players);
});

app.get('/players/:id', function(req, res){
    var player = _.find(players, {id: parseInt(req.params.id)});
    res.json(player || {});
});

app.post('/players', function(req, res){
    var player = req.body;
    player.id = id;
    players.push(player);
    
    res.json(player);
});

app.put('/player/:id', function(req, res){
  var update = req.body;
  if (update.id) {
    delete update.id
  }

  var player = _.findIndex(players, {id: parseInt(req.params.id)});
  if (!players[player]) {
    res.send();
  } else {
    var updatedPlayer = _.assign(players[player], update);
    res.json(updatedPlayer);
  }
});

app.use(function(err, req, res, next){
   if (err) {
       res.status(500).send(err);
   } 
});

var port = 3001;

app.listen(port,function(){
    console.log('listening on http://', port);
    
});