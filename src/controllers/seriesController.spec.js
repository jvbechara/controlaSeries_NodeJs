var expect  = require("chai").expect;
var request = require("request");
const app = require('../../server');
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');
var runOrder = 1;

chai.use(chaiHttp);

var id = undefined;

function assertRunOrder(expectedRunOrder) {
    assert.equal(runOrder++, expectedRunOrder);
}
  

describe("POST", function() {
    it("Espera resposta 200 ok", (done) => {
        assertRunOrder(1);
        let serie = {
            "title": "Zorro",
            "sinopse": "aaa",
            "seasons": 14,
            "status": 0
        }
        chai.request(app)
            .post("/series-create/")
            .send(serie)
            .end(function(error, response, body){
                id = response.body._id;
                //console.log(id);
                expect(response.statusCode).to.equal(200);
            })
        done();
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
            .send(serie)
            .end(function(error, response, body){
                expect(response.statusCode).to.equal(400);
            })
        done();
    });
});

describe("getSeries", function() {
    it("Espera resposta 200 ok", function() {
        assertRunOrder(3);
        var url = "http://localhost:3001/series";
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
        });
    });

    it("Espera resposta 404 - Não encontrado", function() {
        assertRunOrder(4);
        var url = "http://localhost:3001/xxxx";
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(404);
        });
    });
});

describe("getSerie", function() {
    it("Espera resposta 200 da função GetSerie", function() {
        assertRunOrder(5);
        var url = "http://localhost:3001/series/" + id;
        chai.request(url, function(error, response, body) {
            console.log("oi")
            console.log(response.body);
            expect(response.statusCode).to.equal(200);
        })
        
    });


    it("Espera resposta 404 - Não encontrado", function() {
        assertRunOrder(6);
        var url = "http://localhost:3001/series/11111";
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(404);
        });
    });
});

describe("getSeriesByStatus", function() {
    it("Espera resposta 200 ok", function() {
        assertRunOrder(7);
        var url = "http://localhost:3001/series-status/0?page=1";
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
        });
    });

    it("Espera resposta 404 - Não encontrado", function() {
        assertRunOrder(8);
        var url = "http://localhost:3001/series-status/3?page=2";
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(404);
        });
    });
});

describe("getSeriesBySubstring", function() {
    it("Espera resposta 200 ok", function() {
        assertRunOrder(9);
        var url = "http://localhost:3001/series-search/got";
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
        });
    });

    it("Espera resposta 404 - Não encontrado", function() {
        assertRunOrder(10);
        var url = "http://localhost:3001/series-search/";
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(404);
        });
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
        var url = "/series/5c9be0106bc10424b4daaf6e"; 

        chai.request(app)
            .put(url)
            .send(serie)
            .end(function(error, response, body){
                expect(response.statusCode).to.equal(200);
            })
        done();
    });

    it("Espera resposta 400 ok", (done) => {
        let serie = {
            "sinopse": "The sinnerrr",
            "seasons": 14,
        }
        chai.request(app)
            .put("/series/xxx")
            .send(serie)
            .end(function(error, response, body){
                expect(response.statusCode).to.equal(400);
            })
        done();
    });
});

describe("Destroy", function() {
    it("Espera resposta 200 ok", (done) => {
        chai.request(app)
            .delete("/series/5c9be0106bc10424b4daaf6e")
            .end(function(error, response, body){
                expect(response.statusCode).to.equal(200);
            })
        done();
    });
    it("Espera resposta 400 ok", (done) => {
        chai.request(app)
            .del("/series/5cb8354c4415a805d7")
            .end(function(error, response, body){
                expect(response.statusCode).to.equal(400);
            })
        done();
    });
});