var expect  = require("chai").expect;
const app = require('../../server');
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');
var request = require('supertest');

var runOrder = 1;
function assertRunOrder(expectedRunOrder) {
    assert.equal(runOrder++, expectedRunOrder);
}

chai.use(chaiHttp);

var genericflix_token = '';
//let's set up the data we need to pass to the login method
//now let's login the user before we run any tests
var authenticatedUser = request.agent(app);

const userCredentials = {
    "name": "Ana",
    "email": "ana1@gmail.com", 
    "password": "124"
}

describe("POST USER", function() {
    it("Espera resposta 200 ok", (done) => {
        assertRunOrder(1);
           
        chai.request(app)
            .post('/user')
            .send(userCredentials)
            .end(function(err, response){
                expect(response.statusCode).to.equal(200);
            });
            done();
    });

    it("Espera resposta 200 ok", (done) => {
        assertRunOrder(2);
        const userCredentials = {
            "email": "ana@gmail.com", 
            "password": "123"
        }
           
        chai.request(app)
            .post('/user')
            .send(userCredentials)
            .end(function(err, response){
                expect(response.statusCode).to.equal(400);
            });
            done();
    });
});

describe("POST LOGIN USER", function() {
    it("Espera resposta 200 ok", (done) => {
        assertRunOrder(3);
        authenticatedUser
        .post('/user/authenticate')
        .send(userCredentials)
        .end(function(err, response){
          expect(response.statusCode).to.equal(201);
          expect('Location', '/');
          genericflix_token = response.body.token;
          done();
        });
    });
    it("Espera resposta 200 ok", (done) => {
        assertRunOrder(4);
        authenticatedUser
        .post('/user/authenticate')
        .send({
            "name": "Ana",
            "password": "124"
        })
        .end(function(err, response){
          expect(response.statusCode).to.equal(404);
          expect('Location', '/signin');
          genericflix_token = response.body.token;
          done();
        });
    });
});