
import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';
import { DateTime } from 'luxon';

chai.use(chaiHttp);

// IMPORTANT : For Mocha working, always use function () {}
// (never () => {})

describe('Booking', function () {

    it('GET /bookings should return a success response with all bookings', function (done) {
        chai.request(api)
            .get('/bookings')
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.deep.equal({
                    data: [
                        {
                            id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
                            rentDate: "2023-01-01",
                            returnDate: "2023-01-07",
                            item: {
                                title: "Harry Potter et la coupe de feu",
                                isbn13: "9782070416768",
                                authors: "J.K. Rowling",
                                editor: "Gallimard Jeunesse",
                                langCode: "FR",
                                price: 8.99
                            },
                            user: {
                                id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
                                lastName: "Doe",
                                firstName: "John",
                                birthDate: "1990-01-01",
                                address: "1 rue de la paix",
                                phone: "0606060606",
                                email: "johndoe@outlook.fr",
                            }
                        },
                        {
                            id: "adf0df14-3833-4e33-b665-6639a125d548",
                            rentDate: "2023-04-18",
                            returnDate: "2023-04-25",
                            item: {
                                title: "Harry Potter et la coupe de feu",
                                isbn13: "9782070416768",
                                authors: "J.K. Rowling",
                                editor: "Gallimard Jeunesse",
                                langCode: "FR",
                                price: 8.99
                            },
                            user: {
                                id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
                                lastName: "Doe",
                                firstName: "John",
                                birthDate: "1990-01-01",
                                address: "1 rue de la paix",
                                phone: "0606060606",
                                email: "johndoe@outlook.fr",
                            }
                        },
                        {
                            id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
                            rentDate: "2023-01-01",
                            returnDate: "2023-01-07",
                            item: {
                                title: "Harry Potter et la chambre des secrets",
                                isbn13: "9782070416751",
                                authors: "J.K. Rowling",
                                editor: "Gallimard Jeunesse",
                                langCode: "FR",
                                price: 8.99
                            },
                            user: {
                                id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
                                lastName: "Doe",
                                firstName: "John",
                                birthDate: "1990-01-01",
                                address: "1 rue de la paix",
                                phone: "0606060606",
                                email: "johndoe@outlook.fr",
                            }
                        }
                    ]
                });
                done();
            });
        });

    it('POST /bookings should return a success response with the created booking', function (done) {
        chai.request(api)
            .post('/bookings')
            .send({
                rentDate: DateTime.now().toFormat('yyyy-MM-dd'),
                returnDate: DateTime.now().plus({ days: 7 }).toFormat('yyyy-MM-dd'),
                item: {
                    title: "Harry Potter et la chambre des secrets",
                    isbn13: "9782070416751",
                    authors: "J.K. Rowling",
                    editor: "Gallimard Jeunesse",
                    langCode: "FR",
                    price: 8.99

                },
                user: {
                    id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
                    lastName: "Doe",
                    firstName: "John",
                    birthDate: "1990-01-01",
                    address: "1 rue de la paix",
                    phone: "0606060606",
                    email: "johndoe@outlook.fr",
                }
            })
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(201);
               // Check if the response booking has an id, if is not null and if is a uuid
                chai.expect(res.body.data).to.have.property('id');
                chai.expect(res.body.data.id).to.not.be.null;
                chai.expect(res.body.data.id).to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
                // check all the properties of the booking but not the id
                chai.expect(res.body.data).to.deep.include({
                    rentDate: DateTime.now().toFormat('yyyy-MM-dd'),
                    returnDate: DateTime.now().plus({ days: 7 }).toFormat('yyyy-MM-dd'),
                    item: {
                        title: "Harry Potter et la chambre des secrets",
                        isbn13: "9782070416751",
                        authors: "J.K. Rowling",
                        editor: "Gallimard Jeunesse",
                        langCode: "FR",
                        price: 8.99
                    },
                    user: {
                        id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
                        lastName: "Doe",
                        firstName: "John",
                        birthDate: "1990-01-01",
                        address: "1 rue de la paix",
                        phone: "0606060606",
                        email: "johndoe@outlook.fr",
                    }
                });
                done();
            });
        })

    it('POST /bookings should return a 400 status if the return date is before the rent date', function (done) {
        chai.request(api)
            .post('/bookings')
            .send({
                // rent date is today
                rentDate: DateTime.now().toFormat('yyyy-MM-dd'),
                returnDate: DateTime.now().minus({ days: 7 }).toFormat('yyyy-MM-dd'),
                item: {
                    title: "Harry Potter et la chambre des secrets",
                    isbn13: "9782070416751",
                    authors: "J.K. Rowling",
                    editor: "Gallimard Jeunesse",
                    langCode: "FR",
                    price: 8.99

                },
                user: {
                    id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
                    lastName: "Doe",
                    firstName: "John",
                    birthDate: "1990-01-01",
                    address: "1 rue de la paix",
                    phone: "0606060606",
                    email: "johndoe@outlook.fr",
                }
            })
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(400);
                chai.expect(res.body).to.deep.include({
                    error: {
                        message: "The rent date must be before the return date"
                    }
                });
                done();
            });
    });

    it('POST /bookings should return a 400 status if the user does not exist', function (done) {
        chai.request(api)
            .post('/bookings')
            .send({
                rentDate: DateTime.now().toFormat('yyyy-MM-dd'),
                returnDate: DateTime.now().plus({ days: 7 }).toFormat('yyyy-MM-dd'),
                item: {
                    title: "Harry Potter et la chambre des secrets",
                    isbn13: "9782070416751",
                    authors: "J.K. Rowling",
                    editor: "Gallimard Jeunesse",
                    langCode: "FR",
                    price: 8.99

                },
                user: {
                    // fake id
                    id:'uknown',
                    lastName: "Moe",
                    firstName: "Mohn",
                    birthDate: "1990-01-01",
                    address: "1 rue de la paix",
                    phone: "0606060606",
                    email: "moemohn@hotmail.fr",

                }
            })
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(400);
                chai.expect(res.body).to.deep.include({
                    error: {
                        message: "The user doesn't exist"
                    }
                });
                done();
            });
        });

    it('POST /bookings should return a 400 status if the item does not exist', function (done) {
        chai.request(api)
            .post('/bookings')
            .send({
                rentDate: DateTime.now().toFormat('yyyy-MM-dd'),
                returnDate: DateTime.now().plus({ days: 7 }).toFormat('yyyy-MM-dd'),
                item: {
                    // fake isbn
                    isbn13: "97",
                    title: "Harry Potter et la chambre des secrets",
                    authors: "J.K. Rowling",
                    editor: "Gallimard Jeunesse",
                    langCode: "FR",
                    price: 8.99
                },
                user: {
                    id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
                    lastName: "Doe",
                    firstName: "John",
                    birthDate: "1990-01-01",
                    address: "1 rue de la paix",
                    phone: "0606060606",
                    email: "johndoe@outlook.fr",
                }
            })
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(400);
                chai.expect(res.body).to.deep.include({
                    error: {
                        message: "The book doesn't exist"
                    }
                });
                done();
            });
        });

    it('POST /bookings should return a 400 status if the item is already booked', function (done) {
        chai.request(api)
            .post('/bookings')
            .send({
                rentDate: DateTime.now().toFormat('yyyy-MM-dd'),
                returnDate: DateTime.now().plus({ days: 7 }).toFormat('yyyy-MM-dd'),
                item: {
                    title: "Harry Potter et la coupe de feu",
                    isbn13: "9782070416768",
                    authors: "J.K. Rowling",
                    editor: "Gallimard Jeunesse",
                    langCode: "FR",
                    price: 8.99
                },
                user: {
                    id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
                    lastName: "Doe",
                    firstName: "John",
                    birthDate: "1990-01-01",
                    address: "1 rue de la paix",
                    phone: "0606060606",
                    email: "johndoe@outlook.fr",
                }
            })
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(400);
                chai.expect(res.body).to.deep.include({
                    error: {
                        message: "The book is already booked"
                    }
                });
                done();
            });
        });
    
    it('POST /bookings should return a 400 status if the rent date is before today', function (done) {
        chai.request(api)
            .post('/bookings')
            .send({
                rentDate: DateTime.now().minus({day: 4}).toFormat('yyyy-MM-dd'),
                returnDate: DateTime.now().plus({ days: 7 }).toFormat('yyyy-MM-dd'),
                item: {
                    title: "Harry Potter et la coupe de feu",
                    isbn13: "9782070416768",
                    authors: "J.K. Rowling",
                    editor: "Gallimard Jeunesse",
                    langCode: "FR",
                    price: 8.99
                },
                user: {
                    id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
                    lastName: "Doe",
                    firstName: "John",
                    birthDate: "1990-01-01",
                    address: "1 rue de la paix",
                    phone: "0606060606",
                    email: "johndoe@outlook.fr",
                }
            })
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(400);
                chai.expect(res.body).to.deep.include({
                    error: {
                        message: "The rent date must be after today"
                    }
                });
                done();
            });
                   
        });

    it('GET /bookings/:id should return a 200 status and the booking', function (done) {
        chai.request(api)
            .get('/bookings/b33a5cdc-d61f-4fd3-ab99-18a529330cf9')
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.deep.equal({
                    data: {
                        id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
                        rentDate: "2023-01-01",
                        returnDate: "2023-01-07",
                         item: {
                            title: "Harry Potter et la coupe de feu",
                            isbn13: "9782070416768",
                            authors: "J.K. Rowling",
                            editor: "Gallimard Jeunesse",
                            langCode: "FR",
                            price: 8.99
                        },
                        user: {
                            id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
                            lastName: "Doe",
                            firstName: "John",
                            birthDate: "1990-01-01",
                            address: "1 rue de la paix",
                            phone: "0606060606",
                            email: "johndoe@outlook.fr",
                        }
                    }
                    
                });
                done();
            });
        })

    it('GET /bookings/:id should return a 400 status if the booking does not exist', function (done) {
        chai.request(api)
            .get('/bookings/1')
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(400);
                chai.expect(res.body).to.deep.include({
                    error: {
                        message: "The booking doesn't exist"
                    }
                });
                done();
            });
        });

    it('GET /bookings/users/:userID should return a 200 status and the bookings of the user', function (done) {
        chai.request(api)
            .get('/bookings/users/b33a5cdc-d61f-4fd3-ab99-18a529330cf9')
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(200);
                // check the length of the array
                chai.expect(res.body.data).to.have.lengthOf(4);
                done();
            })
        })

    it('GET /bookings/users/:userID should return a 400 status if the user does not exist', function (done) {
        chai.request(api)
            .get('/bookings/users/1')
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(400);
                chai.expect(res.body).to.deep.include({
                    error: {
                        message: "The user doesn't exist"
                    }
                });
                done();
            });
        });

    it('GET /bookings/items/:itemID should return a 200 status and the bookings of the item', function (done) {
        chai.request(api)
            .get('/bookings/items/9782070416768')
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(200);
                // check the length of the array
                chai.expect(res.body.data).to.have.lengthOf(2);
                done();
            })
        })

    it('PUT /bookings/:id should return a 200 status and the bookings with return date updated', function (done) {

        const booking = {
            id: "adf0df14-3833-4e33-b665-6639a125d548",
            rentDate: DateTime.now().minus({days: 2}).toFormat('yyyy-MM-dd'),
            returnDate: DateTime.now().plus({days: 5}).toFormat('yyyy-MM-dd'),
            item: {
                title: "Harry Potter et la coupe de feu",
                isbn13: "9782070416768",
                authors: "J.K. Rowling",
                editor: "Gallimard Jeunesse",
                langCode: "FR",
                price: 8.99
            },
            user: {
                id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
                lastName: "Doe",
                firstName: "John",
                birthDate: "1990-01-01",
                address: "1 rue de la paix",
                phone: "0606060606",
                email: "johndoe@outlook.fr",
            }
        }

        booking.returnDate = DateTime.fromISO(booking.returnDate).plus({ days: 7 }).toFormat('yyyy-MM-dd');

        chai.request(api)
            .put('/bookings/adf0df14-3833-4e33-b665-6639a125d548')
            .send(booking)
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.deep.equal({
                    data: {
                        id: "adf0df14-3833-4e33-b665-6639a125d548",
                        rentDate: DateTime.now().minus({days: 2}).toFormat('yyyy-MM-dd'),
                        returnDate: DateTime.now().plus({days: 12}).toFormat('yyyy-MM-dd'),
                        item: {
                            title: "Harry Potter et la coupe de feu",
                            isbn13: "9782070416768",
                            authors: "J.K. Rowling",
                            editor: "Gallimard Jeunesse",
                            langCode: "FR",
                            price: 8.99
                        },
                        user: {
                            id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
                            lastName: "Doe",
                            firstName: "John",
                            birthDate: "1990-01-01",
                            address: "1 rue de la paix",
                            phone: "0606060606",
                            email: "johndoe@outlook.fr",
                        }
                    }
                });
                done();
            });
        });

    it('PUT /bookings/:id should return a 400 status if the booking does not exist', function (done) {
        const booking = {
            id: "adf0df14-3833-4e33-b665-6639a125d548",
            rentDate: DateTime.now().minus({days: 2}).toFormat('yyyy-MM-dd'),
            returnDate: DateTime.now().plus({days: 5}).toFormat('yyyy-MM-dd'),
            item: {
                title: "Harry Potter et la coupe de feu",
                isbn13: "9782070416768",
                authors: "J.K. Rowling",
                editor: "Gallimard Jeunesse",
                langCode: "FR",
                price: 8.99
            },
            user: {
                id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
                lastName: "Doe",
                firstName: "John",
                birthDate: "1990-01-01",
                address: "1 rue de la paix",
                phone: "0606060606",
                email: "johndoe@outlook.fr",
            }
        }

        booking.returnDate = DateTime.fromISO(booking.returnDate).plus({ days: 7 }).toFormat('yyyy-MM-dd');

        chai.request(api)
            .put('/bookings/1')
            .send(booking)
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(400);
                chai.expect(res.body).to.deep.include({
                    error: {
                        message: "The booking doesn't exist"
                    }
                });
                done();
            });
        });

    it('DELETE /bookings/:id should return a 200 status and the bookings with return date updated', function (done) {
        chai.request(api)
            .delete('/bookings/adf0df14-3833-4e33-b665-6639a125d548')
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.deep.equal({
                    data: {
                        id: "adf0df14-3833-4e33-b665-6639a125d548",
                        rentDate: DateTime.now().minus({days: 2}).toFormat('yyyy-MM-dd'),
                        returnDate: DateTime.now().plus({days: 12}).toFormat('yyyy-MM-dd'),
                        item: {
                            title: "Harry Potter et la coupe de feu",
                            isbn13: "9782070416768",
                            authors: "J.K. Rowling",
                            editor: "Gallimard Jeunesse",
                            langCode: "FR",
                            price: 8.99
                        },
                        user: {
                            id: "b33a5cdc-d61f-4fd3-ab99-18a529330cf9",
                            lastName: "Doe",
                            firstName: "John",
                            birthDate: "1990-01-01",
                            address: "1 rue de la paix",
                            phone: "0606060606",
                            email: "johndoe@outlook.fr",
                        }
                    }

                });
                done();
            })
        })

    it('DELETE /bookings/:id should return a 400 status if the booking does not exist', function (done) {
        chai.request(api)
            .delete('/bookings/1')
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(400);
                chai.expect(res.body).to.deep.include({
                    error: {
                        message: "The booking doesn't exist"
                    }
                });
                done();
            })
        })

                


});