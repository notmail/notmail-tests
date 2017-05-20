var supertest = require("supertest");
var should = require("should");
var clone = require('clone');

var config = require("../config/config");
var app = require("../data/app");

var server = supertest.agent(config.server);

describe("<DELETE> Application Removal", function () {
      
    it("WRONG QUERY, ROOT_SECRET MISSING", function (done) {
        
        login_test = clone(app.app_login);
        delete login_test.root_secret;

        server
            .delete("app/registry/")
            .query(login_test)
            .expect(400)
            .end(function (err, res) {
                if (err){console.log(res.body); return done(err);  }
                res.status.should.equal(400);

                done();
            });

    });

    it("FORBIDDEN QUERY, ROOT_SECRET WRONG", function (done) {
        
        login_test = clone(app.app_login);
        login_test.root_secret = "ABC"

        server
            .delete("app/registry/")
            .query(login_test)
            .expect(403)
            .end(function (err, res) {
                if (err){console.log(res.body); return done(err);  }
                res.status.should.equal(403);

                done();
            });

    });


    it("OK. APP DELETED", function (done) {

        server
            .delete("app/registry/")
            .query(app.app_login)
            .expect(200)
            .end(function (err, res) {
                if (err){console.log(res.body); return done(err);  }
                res.status.should.equal(200);

                done();
            });

    });

    it("<__GET__> AUTH ERROR. APP DELETED", function (done) {

        server
            .get("app/registry/")
            .query(app.app_login)
            .set('Accept', 'application/json')
            .expect(401)
            .end(function (err, res) {
                if (err){console.log(res.body); return done(err);  }
                res.status.should.equal(401);

                done();
            });

    });

});
