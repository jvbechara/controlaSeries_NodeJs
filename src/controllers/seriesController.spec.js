var expect  = require("chai").expect;
const app = require('../../server');
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');
var request = require('supertest');

var runOrder = 1;

chai.use(chaiHttp);

var id = undefined;
var genericflix_token = '';
//let's set up the data we need to pass to the login method
const userCredentials = {
    "email": "joaovictor.bechara@gmail.com", 
    "password": "123456"
}
  //now let's login the user before we run any tests
var authenticatedUser = request.agent(app);

before(function(done){
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


describe("Teste Series", function(){
describe("POST", function() {
    it("Espera resposta 200 ok", (done) => {
        assertRunOrder(1);
        let serie = {
            "title": "Zzzorro",
            "sinopse": "aaa",
             "seasons": 14,
             "status": 0,
             "userId": "5c9e5f09dfcef85ae82375d8"
            }
            
            chai.request(app)
            .post("/series-create/")
            .set('genericflix_token', genericflix_token)
            .send(serie)
            .end(function(error, response, body){
                id = response.body._id;
                console.log('>>> '+id);
                expect(response.statusCode).to.equal(200);
            })
            done(null, id);
        });
        
        it("Espera resposta 400", (done) => {
            assertRunOrder(2);
            let serie = {
                "title": "Two and a Half men",
                "seasons": 14,
                "status": 0
            }
            chai.request(app)
            .post("/series-create/")
            .set('genericflix_token', genericflix_token)
            .send(serie)
            .end(function(error, response, body){
                expect(response.statusCode).to.equal(400);
            })
            done();
        });
    });
    
    describe("getSeries", function() {
        it("Espera resposta 200 ok", function(done) {
            assertRunOrder(3);
            //var url = "http://localhost:3001/series";
            chai.request(app)
            .get("/series/")
            .set('genericflix_token', genericflix_token)
            .end(function(error, response, body){
                expect(response.statusCode).to.equal(200);
            })
            done();
        });
        
        
        it("Espera resposta 404 - Não encontrado", function(done) {
            assertRunOrder(4);
            //var url = "http://localhost:3001/xxxx";
            chai.request(app)
            .get("/xxx/")
            .set('genericflix_token', genericflix_token)
            .end(function(error, response, body){
                expect(response.statusCode).to.equal(404);
            })
        done();
    });
});

describe("getSerie", function(done) {
    it("Espera resposta 200 da função GetSerie", function() {
        assertRunOrder(5);
        //var url = "http://localhost:3001/series/" + id;
        chai.request(app)
        .get('/series/' + '5ca3aacd31ceab4a601dca9f')
        .set('genericflix_token', genericflix_token)
        .end(function(error, response, body) {
            expect(response.statusCode).to.equal(200);
        })
    });
    
    
    it("Espera resposta 404 - Não encontrado", function(done) {
        assertRunOrder(6);
        //var url = "http://localhost:3001/series/11111";
        chai.request(app)
        .get('/series/11111')
        .set('genericflix_token', genericflix_token)
        .end(function(error, response, body) {
            expect(response.statusCode).to.equal(404);
        });
        done();
    });
});

describe("getSeriesByStatus", function() {
    it("Espera resposta 200 ok", function(done) {
        assertRunOrder(7);
        chai.request(app)
        .get('/series-status/0?page=1')
        .set('genericflix_token', genericflix_token)
        .end(function(error, response, body) {
            expect(response.statusCode).to.equal(200);
        });
        done();
    });
    
    it("Espera resposta 404 - Não encontrado", function(done) {
        assertRunOrder(8);        
        chai.request(app)
        .get('/series-status/3?page=2')
        .set('genericflix_token', genericflix_token)
        .end(function(error, response, body) {
            expect(response.statusCode).to.equal(404);
        });
        done();
    });
});

describe("getSeriesBySubstring", function() {
    it("Espera resposta 200 ok", function(done) {
        assertRunOrder(9);
        chai.request(app)
        .get('/series-search/a')
        .set('genericflix_token', genericflix_token)
        .end(function(error, response, body) {
            expect(response.statusCode).to.equal(200);
        });
        done();
    });
    
    it("Espera resposta 404 - Não encontrado", function(done) {
        assertRunOrder(10);
        //var url = "http://localhost:3001/series-search/";
        chai.request(app)
        .get('/series-search/')
        .set('genericflix_token', genericflix_token)
        .end(function(error, response, body) {
            expect(response.statusCode).to.equal(404);
        });
        done();
    });
});


describe("PUT", function() {
    it("PUT - Espera resposta 200 ok", (done) => {
        assertRunOrder(11);
        //console.log(id);
        let serie = {
            "sinopse": "atualização teste",
            "seasons": 14,
        }
        
        chai.request(app)
        .put("/series/5ca3ba5fed6feb2bf4b74a30")
        .set('genericflix_token', genericflix_token)
        .send(serie)
        .end(function(error, response, body){
            expect(response.statusCode).to.equal(200);
        })
        done();
    });
    
    it("Espera resposta 400 ok", (done) => {
        assertRunOrder(12);
        let serie = {
            "sinopse": "The sinnerrr",
            "seasons": 14,
        }
        chai.request(app)
        .put("/series/xx")
        .set('genericflix_token', genericflix_token)
        .send(serie)
        .end(function(error, response, body){
            expect(response.statusCode).to.equal(400);
        })
        done();
    });
});

describe("Destroy", function() {
    it("Espera resposta 200 ok", (done) => {
        //console.log('>< ', done.id)
        assertRunOrder(13);
        chai.request(app)
        .delete("/series/5ca5fd2bbc9dc754e0ea30e7")
        .set('genericflix_token', genericflix_token)
        .end(function(error, response, body){
            expect(response.statusCode).to.equal(200);
        })
        done();
    });
    it("Espera resposta 400 ok", (done) => {
        assertRunOrder(14);
        chai.request(app)
        .del("/series/xxx")
        .set('genericflix_token', genericflix_token)
        .end(function(error, response, body){
            expect(response.statusCode).to.equal(400);
        })
        done();
    });
});
});

function assertRunOrder(expectedRunOrder) {
    assert.equal(runOrder++, expectedRunOrder);
}
          