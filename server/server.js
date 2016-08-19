var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');

var playerRouter = require('./players');
var userRouter = require('./users');

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/players', playerRouter);
app.use('/users', userRouter);


app.use(function(err, req, res, next){
   if (err) {
       res.status(500).send(err);
   } 
});

module.exports = app;