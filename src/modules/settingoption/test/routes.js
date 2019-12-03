'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Settingoption = mongoose.model('Settingoption');

var credentials,
    token,
    mockup;

describe('Settingoption CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            label: "Selling location(s)",
            description: "This option lets you limit which countries you are willing to sell to.",
            type: "select",
            options: {
                all: "Sell to all countries",
                all_except: "Sell to all countries, except for&hellip;",
                specific: "Sell to specific countries"
            },
            tip: "This option lets you limit which countries you are willing to sell to.",
            value: "all",
            group_id: "general"
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Settingoption get use token', (done) => {
        request(app)
            .get('/api/settingoptions')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                done();
            });
    });

    it('should be Settingoption get by id', function (done) {

        request(app)
            .post('/api/settingoptions')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/settingoptions/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.label, mockup.label);
                        assert.equal(resp.data.description, mockup.description);
                        assert.equal(resp.data.type, mockup.type);
                        assert.equal(resp.data.tip, mockup.tip);
                        assert.equal(resp.data.value, mockup.value);
                        assert.equal(resp.data.default, 'all');
                        assert.equal(resp.data.group_id, mockup.group_id);
                        assert.equal(resp.data.options.all, mockup.options.all)
                        assert.equal(resp.data.options.all_except, mockup.options.all_except)
                        assert.equal(resp.data.options.specific, mockup.options.specific)
                        done();
                    });
            });

    });

    it('should be Settingoption post use token', (done) => {
        request(app)
            .post('/api/settingoptions')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.status, 200);
                assert.equal(resp.data.label, mockup.label);
                assert.equal(resp.data.description, mockup.description);
                assert.equal(resp.data.type, mockup.type);
                assert.equal(resp.data.tip, mockup.tip);
                assert.equal(resp.data.value, mockup.value);
                assert.equal(resp.data.default, 'all');
                assert.equal(resp.data.group_id, mockup.group_id);
                assert.equal(resp.data.options.all, mockup.options.all)
                assert.equal(resp.data.options.all_except, mockup.options.all_except)
                assert.equal(resp.data.options.specific, mockup.options.specific)
                done();
            });
    });

    it('should be settingoption put use token', function (done) {

        request(app)
            .post('/api/settingoptions')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    label: 'name update'
                }
                request(app)
                    .put('/api/settingoptions/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.label, update.label);
                        assert.equal(resp.data.description, mockup.description);
                        assert.equal(resp.data.type, mockup.type);
                        assert.equal(resp.data.tip, mockup.tip);
                        assert.equal(resp.data.value, mockup.value);
                        assert.equal(resp.data.default, 'all');
                        assert.equal(resp.data.group_id, mockup.group_id);
                        assert.equal(resp.data.options.all, mockup.options.all)
                        assert.equal(resp.data.options.all_except, mockup.options.all_except)
                        assert.equal(resp.data.options.specific, mockup.options.specific)
                        done();
                    });
            });

    });

    it('should be settingoption delete use token', function (done) {

        request(app)
            .post('/api/settingoptions')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/settingoptions/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be settingoption get not use token', (done) => {
        request(app)
            .get('/api/settingoptions')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be settingoption post not use token', function (done) {

        request(app)
            .post('/api/settingoptions')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be settingoption put not use token', function (done) {

        request(app)
            .post('/api/settingoptions')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/settingoptions/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be settingoption delete not use token', function (done) {

        request(app)
            .post('/api/settingoptions')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/settingoptions/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Settingoption.remove().exec(done);
    });

});