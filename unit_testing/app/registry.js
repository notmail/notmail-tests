var supertest = require("supertest");
var should = require("should");
var clone = require('clone');

var config = require("../config/config");
var app = require("../data/app");

var server = supertest.agent(config.server);

describe("<POST> Application Registration", function () {

    it("REGISTER APP CORRECTLY", function (done) {

        server
            .post("app/registry/")
            .send(JSON.stringify(app.app_data))
            .set('Accept', 'application/json')
            .set('Content-type', "application/json")
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                if (err){console.log(res.body); return done(err);  }
                res.status.should.equal(200);

                should(res.body.auth).be.ok();
                should(res.body.auth.unique_id).be.ok();
                should(res.body.auth.shared_key).be.ok();
                should(res.body.auth.root_secret).be.ok();

                app.app_login.root_secret = res.body.auth.root_secret;
                app.app_login.shared_key = res.body.auth.shared_key;
                app.app_login.unique_id = res.body.auth.unique_id;

                done();
            });

    });


    it("REGISTER APP IN-CORRECTLY (title missing)", function (done) {
        app_test = clone(app.app_data);
        delete app_test.app.title;

        server
            .post("app/registry/")
            .send(JSON.stringify(app_test))
            .set('Accept', 'application/json')
            .set('Content-type', "application/json")
            .expect(400)
            .end(function (err, res) {
                if (err){console.log(res.body); return done(err);  }
                res.status.should.equal(400);

                done();
            });

    });

});




describe("<GET> Application Information", function () {

    it("WRONG AUTH", function (done) {
        login_test = clone(app.app_login);
        login_test.shared_key = "1";

        server
            .get("app/registry/")
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
            .get("app/registry/")
            .query(app.app_login)
            .set('Accept', 'application/json')
            .expect('Content-type', /application\/json/)
            .expect(200)
            .end(function (err, res) {
                if (err){console.log(res.body); return done(err);  }
                res.status.should.equal(200);

                should(res.body.app).be.ok();
                should.equal(res.body.app.title, app.app_data.app.title);
                should.equal(res.body.app.description, app.app_data.app.description);
                should.equal(res.body.app.url, app.app_data.app.url);
                should.equal(res.body.app.icon, app.app_data.app.icon);

                should(res.body.app.unsecured_source).be.ok();

                done();
            });

    });

});



describe("<PUT> Application data change", function () {

    it("OK RESPONSE, APP EDITED", function (done) {
        
        app_test = {app: {}};
        app_test.app.description = app.app_data.description + " App edited.";
        app.app_data.app.description += " App edited.";

        server
            .put("app/registry/")
            .query(app.app_login)
            .send(JSON.stringify(app.app_data))
            .set('Accept', 'application/json')
            .set('Content-type', "application/json")
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                if (err){console.log(res.body); return done(err);  }
                res.status.should.equal(200);

                should(res.body.auth).be.ok();
                should(res.body.auth.shared_key).be.ok();

                app.app_login.shared_key = res.body.auth.shared_key;

                done();
            });

    });


    it("<__GET__> Validate authentication and changes", function (done) {

        server
            .get("app/registry/")
            .query(app.app_login)
            .set('Accept', 'application/json')
            .expect('Content-type', /application\/json/)
            .expect(200)
            .end(function (err, res) {
                if (err){console.log(res.body); return done(err);  }
                res.status.should.equal(200);

                should(res.body.app).be.ok();
                should.equal(res.body.app.title, app.app_data.app.title);
                should.equal(res.body.app.description, app.app_data.app.description);
                should.equal(res.body.app.url, app.app_data.app.url);
                should.equal(res.body.app.icon, app.app_data.app.icon);

                should(res.body.app.unsecured_source).be.ok();

                done();
            });

    });

});
