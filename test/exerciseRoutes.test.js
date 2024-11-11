const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../src/backend/app'); // Adjust path if needed

chai.use(chaiHttp);

describe('Exercise Routes', () => {

  // Test POST /exercises/add
  it('should add a new exercise', (done) => {
    const exercise = {
      name: 'Push-up',
      description: 'A bodyweight exercise'
    };

    chai.request(app)
      .post('/exercises/add')
      .send(exercise)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').eql('Exercise added successfully');
        expect(res.body).to.have.property('exercise_id');
        done();
      });
  });

  // Test GET /exercises
  it('should retrieve all exercises', (done) => {
    chai.request(app)
      .get('/exercises')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.at.least(1);
        done();
      });
  });
});