// exerciseRoutes.test.js
import chai from 'chai';
import request from 'supertest';
import { app } from '../src/backend/app.js';

const { expect } = chai;

describe('Exercise Routes', () => {
  it('should add a new exercise', (done) => {
    const exercise = {
      name: 'Push-up',
      description: 'A bodyweight exercise'
    };

    request(app)
      .post('/exercises/add')
      .send(exercise)
      .expect(200) // supertest allows us to directly check the status
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').eql('Exercise added successfully');
        expect(res.body).to.have.property('exercise_id');
        done();
      });
  });

  it('should retrieve all exercises', (done) => {
    request(app)
      .get('/exercises')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.at.least(1);
        done();
      });
  });
});
