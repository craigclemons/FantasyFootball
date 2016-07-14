var _ = require('lodash');
var userRouter = require('express').Router();

var users = [];
var id = 0;

var updateId = function(req, res, next){
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

userRouter.param('id', function(req, res, next, id){
    var foundIds = _.find(foundIds, {id: id});
    
    if(foundId){
        req.foundId = foundId;
        next();
    }
    else {
        res.send();//This should eventually throw an error of some sort
    }
});

userRouter.route('/')
    .get(function(req, res){
    res.json(users);
})
    .post(function(req, res){
    var user = req.body;
    users.push(user);
    res.json(user);
});

userRouter.route('/:id')
    .get(function(req, res){
    var user = req.foundId;
    res.json(player || {});
})
    .put(function(req, res){
    var update = req.body;
    if (update.id){
        delete update.id;
    }
    
    var user = _findIndex(users, {id: req.param.id});
    
    if(!users[user]){
        res.send();
    } else{
        var updateUser = _assign(users(user), update);
        res.json(updateUser);
    }
});

module.exports = userRouter;
