/*require the dev-dependencies*/
let chai = require('chai');
let chaiHttp = require('chai-http');
let index = require('../../index');
let should = chai.should();

chai.use(chaiHttp);

describe('### Htpp operations to get related info', () => {
    it("should response successful token", (done) => {
        let body =
        {
            "username": "travel",
            "password": "developer"
        }
        chai.request(index)
            .post('/token')
            .send(body)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('message').eql("Authentication successful!");
                res.body.should.have.property('token_type').eql("Bearer");
                done();
            });
    });

    it("should response auth failed error message", (done) => {
        let body =
        {
            "username": "wrongUser",
            "password": "developer"
        }
        chai.request(index)
            .post('/token')
            .send(body)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('message').eql("Incorrect username or password");
                done();
            });
    });

   
});