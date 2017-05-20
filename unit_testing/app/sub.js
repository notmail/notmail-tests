var supertest = require("supertest");
var should = require("should");
var clone = require('clone');

var config = require("../config/config");
var app = require("../data/app");
var user = require("../data/user");

var server = supertest.agent(config.server);


describe("Request Subscription", function () {

    it("OK RESPONSE", function (done) {

        server
            .put("app/sub/")
            .query(app.app_login)
            .send(JSON.stringify({
                dest: {
                    user: user.user_login.notmail
                }
            }))
            .set("Content-Type", "application/json")
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err){
                    console.log(res.body)
                    return done(err);
                }
                res.status.should.equal(200);

                done();
            });

    });

});

describe("__[/user/sub/]__", function () {

    it("Accept Subscription", function (done) {

        server
            .put("user/sub/")
            .query({token: user.user_login.token})
            .send(JSON.stringify({
                dest: {
                    user: user.user_login.notmail
                }
            }))
            .set("Content-Type", "application/json")
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err){
                    console.log(res.body)
                    return done(err);
                }
                res.status.should.equal(200);

                done();
            });

    });

});