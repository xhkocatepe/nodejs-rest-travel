/*require the dev-dependencies*/
let chai = require('chai');
let chaiHttp = require('chai-http');
let index = require('../../index');
let should = chai.should();

chai.use(chaiHttp);

describe('### Htpp operations to get related info', () => {

    /** GET unvalidated field requests */
    it("should response failed message because of without Authorization info", (done) => {
        /** minCount > maxCount */
        let query =
        {
            "pointLong": -97.62908873,
            "pointLat": 31.20752395,
            "radius": 10000000,
            "startDate": "2016/06/06 05:50",
            "endDate": "2016/06/06 05:49",
        };
        chai.request(index)
            .get('/trips')
            .query(query)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('message');
                res.body.should.have.property('message').eql("Invalid OAuth Request to the protected resource!");
                done();
            });
    });

    /** GET valited data field requests with Auth Token */
    it("should response failed message because of the semantic error DATE", (done) => {
        /** minCount > maxCount */
        let query =
        {
            "pointLong": -97.62908873,
            "pointLat": 31.20752395,
            "radius": 10000000,
            "startDate": "2016/06/06 05:30",
            "endDate": "2016/06/06 05:50",
        };
        chai.request(index)
            .get('/trips')
            .query(query)
            .auth("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJpdGFrc2kiLCJpYXQiOjE1NjEzMzQyMTMsImV4cCI6MTU2MTQyMDYxM30.ETHr6Q9ulEALuyl8YBebngw3SMz-Z5tSoMl8r3Y00Ug", { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('trips');
                res.body.trips.should.be.a('array');
                done();
            });
    });


    /** GET valited data field requests with Auth Token */
    it("should response failed message because of the semantic error DATE", (done) => {
        /** minCount > maxCount */
        let query =
        {
            "pointLong": -97.62908873,
            "pointLat": 31.20752395,
            "radius": 100000,
        };
        chai.request(index)
            .get('/trips/minMaxTravelled')
            .query(query)
            .auth("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJpdGFrc2kiLCJpYXQiOjE1NjEzMzQyMTMsImV4cCI6MTU2MTQyMDYxM30.ETHr6Q9ulEALuyl8YBebngw3SMz-Z5tSoMl8r3Y00Ug", { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('trips');
                res.body.trips.should.be.a('array');
                done();
            });
    });


    /** GET val'dated data field requests with Auth Token */
    it("should response failed message because of the semantic error DATE", (done) => {
        /** minCount > maxCount */
        let query =
        {
            "pointLong": -97.62908873,
            "pointLat": 31.20752395,
            "radius": 100000,
        };
        chai.request(index)
            .get('/trips/vehicleModelYears')
            .query(query)
            .auth("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJpdGFrc2kiLCJpYXQiOjE1NjEzMzQyMTMsImV4cCI6MTU2MTQyMDYxM30.ETHr6Q9ulEALuyl8YBebngw3SMz-Z5tSoMl8r3Y00Ug", { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('trips');
                res.body.trips.should.be.a('array');
                done();
            });
    });

    /** GET unvalidated field requests */
    it("should response failed message because of the semantic error DATE", (done) => {
        /** minCount > maxCount */
        let query =
        {
            "pointLong": -97.62908873,
            "pointLat": 31.20752395,
            "radius": 10000000,
            "startDate": "2016/06/06 05:50",
            "endDate": "2016/06/06 05:49",
        };
        chai.request(index)
            .get('/trips')
            .auth("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJpdGFrc2kiLCJpYXQiOjE1NjEzMzQyMTMsImV4cCI6MTU2MTQyMDYxM30.ETHr6Q9ulEALuyl8YBebngw3SMz-Z5tSoMl8r3Y00Ug", { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('errors');
                res.body.errors.should.be.a('array');
                done();
            });
    });
});