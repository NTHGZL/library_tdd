import chai from 'chai';
import chaiHttp from 'chai-http';

import api from '../index.js';

chai.use(chaiHttp);

describe('Users', function () {

    it('GET /users should return a success response with an empty array', function (done) {
        chai.request(api).get('/users').end((_, res) => {
            chai.expect(res.statusCode).to.equal(200);
            chai.expect(res.body).to.deep.equal({
                data: [
                    {
                        id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
                        lastName: "Doe",
                        firstName: "John",
                        birthDate: "1990-01-01",
                        address: "1 rue de la paix",
                        phone: "0606060606",
                        email: "johndoe@outlook.fr"
                    },
                    {
                        id: "adf0df14-3833-4e33-b665-6639a125d548",
                        lastName: "Doe",
                        firstName: "Jane",
                        birthDate: "1990-01-01",
                        address: "1 rue de la paix",
                        phone: "0606060606",
                        email: "janedoe@outlook.fr"
                    }
                ]
            });
            done();
        }); 


    it('POST /users should create the user and return a success response with the user', function (done) {
        const user = {
            firstName: 'Jake',
            lastName: 'Poe',
            email: 'jackpoe@outlook.fr',
            birthDate: '1990-01-01',
            address: '2 rue de la paix',
            phone: '0606060606'
        };

        chai.request(api)
            .post('/users')
            .send(user)
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(201);
                chai.expect(res.body).to.deep.equal({
                    data: user
                });
                done();
            });
    });
});
    it('POST /users should create the user and return a success response with the user', function (done) {
        const user = {
            firstName: 'Jake',
            lastName: 'Poe',
            email: 'jakepoe@outlook.fr',
            birthDate: '1990-01-01',
            address: '2 rue de la paix',
            phone: '0606060608',
        };

        chai.request(api)
            .post('/users')
            .send(user)
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(201);
                chai.expect(res.body).to.deep.equal({
                    data: {
                        firstName: 'Jake',
                        lastName: 'Poe',
                        email: 'jakepoe@outlook.fr',
                        birthDate: '1990-01-01',
                        address: '2 rue de la paix',
                        phone: '0606060608',
                    }
                });
                done();
            });
    });

    it('GET /users/:id should return a success response with the user', function (done) {
        const user = {
            id: 'b33a5cdc-d61f-4fd3-ab99-18a529330cf9',
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@outlook.fr',
            birthDate: '1990-01-01',
            address: '1 rue de la paix',
            phone: '0606060606',
        };

        chai.request(api)
            .get('/users/b33a5cdc-d61f-4fd3-ab99-18a529330cf9')
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.deep.equal({
                    data: user
                });
                done();
            });
    });

    it('GET /users/:id should return a 404 response with an error message', function (done) {
        chai.request(api)
            .get('/users/unknown')
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(404);
                chai.expect(res.body).to.deep.equal({
                    error: 'User unknown not found'
                });
                done();
            });
    });

    it('PUT /users/:id should update the user and return a success response with the user', function (done) {
        const user = {
            id: 'b33a5cdc-d61f-4fd3-ab99-18a529330cf9',
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@outlook.fr',
            birthDate: '1990-01-01',
            address: '14 rue de la paix',
            phone: '0606060606',
        };

        chai.request(api)
            .put('/users/b33a5cdc-d61f-4fd3-ab99-18a529330cf9')
            .send(user)
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.deep.equal({
                    data: user
                });
                done();
            });
    });

    it('PUT /users/:id should return a 404 response with an error message', function (done) {
        const user = {
            id: 'b33a5cdc-d61f-4fd3-ab99-18a529330cf9',
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@outlook.fr',
            birthDate: '1990-01-01',
            address: '14 rue de la paix',
            phone: '0606060606',
        };

        chai.request(api)
            .put('/users/unknown')
            .send(user)
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(404);
                chai.expect(res.body).to.deep.equal({
                    error: 'User unknown not found'
                });
                done();
            });
    });

})