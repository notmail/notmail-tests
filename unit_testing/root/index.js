var supertest = require("supertest");
var should = require("should");
var config = require("../config/config")
//var assert = require("assert");

// This agent refers to PORT where program is runninng.

var server = supertest.agent(config.server);

// UNIT test begin

describe("API availability", function () {

    it("API is 200 OK", function (done) {

        server
            .get("/")
            .set('Accept', 'application/json')
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                if(err) return done(err);
                res.status.should.equal(200);
                done();
            });

    });

});