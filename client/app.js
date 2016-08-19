function ready(fn){
    if (document.readyState != 'loading'){
        fn();
    }
    else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

var getValues = function(){
    var name = document.querySelector('input[name=player-name]').value;
    var team = document.getElementById("team");
        team = team.options[team.selectedIndex].value;
    var age  = document.querySelector('input[type=number]').value;
    var position = document.getElementById("position");
        position = position.options[position.selectedIndex].value;
    document.querySelector('input[name=player-name]').value = '';
    document.querySelector('input[type=number]').value = '';
    return{
        name: name,
        team: team,
        age: age,
        position: position
    };
};

var playerTemplate = '<h3><%= name %>' + '<h3><%= team %></h3>' + 'age: <%= age %>' + '<%= position %>';
var players = [];
var makeTemplate = function(data){
    var li = document.createElement('li');
    var playerList = document.querySelector('.player-list');
    var compiled = _.template(playerTemplate);
    var playerHtml = compiled(data);
    li.innerHTML = playerHtml;
    playerList.insertBefore(li, playerList.firstChild);
};

var updatePlayerList = function(){
    var playerData = players[players.length - 1];
    makeTemplate(playerData);
};

var makePlayerList = function(){
    players.forEach(function(player){
        makeTemplate(player);
    });
};

var getAllPlayers = function(){
    fetch('/players').then(function (resp){
        console.log(resp);
        return resp.json();
    }).then(function(data){
        players = players.concat(data);
        makePlayerList();
    });
}

ready(function(){
    getAllPlayers();
    var form = document.querySelector('form');
    form.addEventListener('submit', function(e){
        e.preventDefault();
        var values = getValues();
        fetch('players', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(function (resp){
            return resp.json();
        }).then( function(createdPlayer){
            players.push(createdPlayer);
            updatePlayerList();
            })
            return false;
        })
});

