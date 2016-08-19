var app = require('./server');
var request = require('supertest');
var expect = require('chai').expect;
describe('[PLAYERS]', function () {
    it('should get all players', function (done) {
        request(app).get('/players').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200).end(function (err, resp) {
            expect(resp.body).to.be.an('array');
            done();
        })
    });
    it('should create a player', function (done) {
        request(app).post('/players').send({
            name: 'Robert',
            team: 'Smelters',
            age: '26',
            position: 'Quarterback'
        }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(201).end(function (err, resp) {
            expect(resp.body).to.be.an('Object');
            done();
        })
    });
    it('should delete a player', function(done){
        request(app)
            .post('/players')
            .send({
            name: 'test player',
            team: 'test team',
            age: 22,
            postition: 'halfback'
        })
        .set('Accept', 'application/json')
        .end(function(err, resp) {
        var player = resp.body;
        request(app)
          .delete('/players/' + player.id)
          .end(function(err, resp) {
            expect(resp.body).to.eql(player);
            done();
          });
      })
    })
    it('should updata player', function(done){
        request(app)
            .post('/players')
            .send({
                name:'Jim Doe',
                team:' test team',
                age: 28,
                position: 'Quarterback'
        })
        .end(function(err,resp){
            var player = resp.body;
            request(app)
                .put('/players' + player.id)
                .send({
                    name: 'new name'
            })
            .end(function(err,resp){
                expect(resp.body.name).to.equal('new name');
                done();
            })
        })
    });
});