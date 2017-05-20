var supertest = require("supertest");
var should = require("should");
var clone = require('clone');

var config = require("../config/config");
var app = require("../data/app");
var user = require("../data/user");

var server = supertest.agent(config.server);

var lastsub = "";

describe("___USER API___", function () {

    it("RETRIEVE SUBSCRIPTIONS", function (done) {

        server
            .get("user/sub/")
            .query({
                token: user.user_login.token,
                query: 'pending'
            })
            .set("Content-Type", "application/json")
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err){
                    console.log(res.body)
                    return done(err);
                }
                res.status.should.equal(200);
                lastsub = res.body.subs[res.body.subs.length-1].sub
                done();
            });

    });

    it("ACCEPT LATEST SUBSCRIPTION", function (done) {

        server
            .put("user/sub/")
            .query({
                token: user.user_login.token,
                op: 'subscribe',
                sub: lastsub
            })
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