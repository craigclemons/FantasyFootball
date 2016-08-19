var _ = require('lodash');
var playerRouter = require('express').Router();

var players = [];
var id = 0;

var updateId = function(req, res, next){
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

playerRouter.param('id', function(req, res, next, id){
    var foundIds = _.find(foundIds, {id: id});
    
    if(foundId){
        req.foundId = foundId;
        next();
    }
    else {
        res.send();//This should eventually throw an error of some sort
    }
});

playerRouter.route('/')
    .get(function(req, res){
    res.json(players);
})
    .post(function(req, res){
    var player = req.body;
    players.push(player);
    res.json(player);
});


playerRouter.route('/:id')
   .get(function(req, res){
    var player = req.foundId;
    res.json(player || {});
})
    .put(function(req, res){
    var update = req.body;
    if (update.id){
        delete update.id;
    }
    
    var player = _.findIndex(players, {id: req.params.id});
    
    if(!players[player]){
        req.send();
    } else{
        var updatePlayer = _.assign(players(player), update);
        res.json(updatePlayer);
    }
})
    .delete(function(req, res){
        var player = _findIndex(players, {id: req.params.id});
        players.splice(player,1)
        
        res.json(req.player);
    });
module.exports = playerRouter;
