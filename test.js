var should = require('should'),
    assert = require('assert'),
    request = require('supertest');

var validRequest = require('./test/Request.json'),
    validResponse = require('./test/Response.json');

var app = require('./app');

describe('GET /', function() {
    it('405 error', function(done) {
        request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(405, done);
    });
});

describe('POST /', function() {
    it('return valid shows', function(done) {
        request(app)
            .post('/')
            .send(validRequest)
            .expect(200)
            .end(function(err, res) {
                res.body.should.eql(validResponse);
                done();
            });
    });

    it('status 400 bad request with invalid JSON', function(done) {
        request(app)
            .post('/')
            .send('invalidRequest')
            .expect(400)
            .end(function(err, res) {
                done();
            });
    });

    it('specified error message with invalid body', function(done) {
        request(app)
            .post('/')
            .send('invalidRequest')
            .end(function(err, res) {
                res.body.should.keys('error');
                res.body.error.should.containEql('Could not decode request');
                done();
            });
    });

    it('specified error message with wrong JSON object', function(done) {
        request(app)
            .post('/')
            .send({'hello': 'world'})
            .end(function(err, res) {
                res.body.should.keys('error');
                res.body.error.should.containEql('Could not decode request');
                res.body.error.should.containEql('\'payload\' missing');
                done();
            });
    });
});