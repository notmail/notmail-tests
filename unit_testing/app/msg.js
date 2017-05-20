var supertest = require("supertest");
var should = require("should");
var clone = require('clone');

var config = require("../config/config");
var app = require("../data/app");
var user = require("../data/user");

var server = supertest.agent(config.server);


describe("Send message. server <--- application", function () {

    it("OK RESPONSE. MESSAGE SENT", function (done) {

        server
            .post("app/msg/")
            .query(app.app_login)
            .send(JSON.stringify({
                dest: {
                    user: user.user_login.notmail
                },
                msg: {
                    title: "test msg title",
                    data: "test msg data"
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


describe("Receive messages. client <---> server", function () {

    it("OK RESPONSE. GOT MESSAGES", function (done) {

        server
            .get("user/msg/")
            .query({token: user.user_login.token})
            .set("Content-Type", "application/json")
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
