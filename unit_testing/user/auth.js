var supertest = require("supertest");
var should = require("should");
var clone = require('clone');

var config = require("../config/config");
var user = require("../data/user");

var server = supertest.agent(config.server);

describe("<GET> User Log-In", function () {

    it("WRONG AUTH", function (done) {
        login_test = clone(user.user_login);
        login_test.pwd = '1';

        server
            .get("user/auth/")
            .query(login_test)
            .set('Accept', 'application/json')
            .expect(401)
            .end(function (err, res) {
                if (err){console.log(res.body); return done(err);  }
                res.status.should.equal(401);

                done();
            });

    });


    it("GOOD AUTH", function (done) {

        server
            .get("user/auth/")
            .query(user.user_login)
            .set('Accept', 'application/json')
            .expect('Content-type', /application\/json/)
            .expect(200)
            .end(function (err, res) {
                if (err){console.log(res.body); return done(err);  }
                res.status.should.equal(200);

                should(res.body.session).be.ok();
                should(res.body.session.token).be.ok();

                user.user_login.token = res.body.session.token;

                done();
            });

    });


    it("CHECK TOKEN", function (done) {

        server
            .get("user/auth/info")
            .query({token: user.user_login.token})
            .expect('Content-type', /application\/json/)
            .expect(200)
            .end(function (err, res) {
                if (err){console.log(res.body); return done(err);  }
                res.status.should.equal(200);

                should(res.body.session).be.ok();
                should(res.body.session.token).be.ok();
                should(res.body.session.notmail).be.equal(user.user_login.notmail);
                should(res.body.session.token).be.equal(user.user_login.token);

                done();
            });

    });

});

