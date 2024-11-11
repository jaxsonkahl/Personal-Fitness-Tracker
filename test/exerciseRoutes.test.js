// exerciseRoutes.test.js
import chai from 'chai';
import request from 'supertest';
import { app } from '../src/backend/app.js';
import { db } from '../src/backend/database.js';

const { expect } = chai;

// Reset the database tables before each test to ensure a clean state
function resetDatabase(done) {
  db.serialize(() => {
    db.run(`DELETE FROM Exercises`);
    db.run(`DELETE FROM WorkoutLogs`);
    db.run(`DELETE FROM BodyWeight`, done);
  });
}

describe('Exercise Routes', () => {
  //beforeEach((done) => resetDatabase(done));

  it('should add a new exercise', (done) => {
    const exercise = { name: 'Push-up', description: 'A bodyweight exercise' };
    request(app)
      .post('/exercises/add')
      .send(exercise)
      .expect(200)
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

  it('should update an existing exercise', (done) => {
    const exercise = { name: 'Push-up', description: 'A bodyweight exercise' };
    const updatedExercise = { name: 'Updated Push-up', description: 'An updated description' };

    request(app)
      .post('/exercises/add')
      .send(exercise)
      .end((err, res) => {
        if (err) return done(err);
        const exerciseId = res.body.exercise_id;
        request(app)
          .put(`/exercises/${exerciseId}`)
          .send(updatedExercise)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.have.property('message').eql('Exercise updated successfully');
            done();
          });
      });
  });

  it('should delete an existing exercise', (done) => {
    const exercise = { name: 'Push-up', description: 'A bodyweight exercise' };

    request(app)
      .post('/exercises/add')
      .send(exercise)
      .end((err, res) => {
        if (err) return done(err);
        const exerciseId = res.body.exercise_id;
        request(app)
          .delete(`/exercises/${exerciseId}`)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.have.property('message').eql('Exercise deleted successfully');
            done();
          });
      });
  });

  it('should return an error when name is missing', (done) => {
    const exercise = { description: 'A bodyweight exercise' }; // Missing name

    request(app)
      .post('/exercises/add')
      .send(exercise)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('error').eql('Name is required');
        done();
      });
  });

  it('should return an error when the exercise does not exist', (done) => {
    const updatedExercise = { name: 'Nonexistent Exercise', description: 'This exercise does not exist' };

    request(app)
      .put('/exercises/99999') // Assuming 99999 does not exist
      .send(updatedExercise)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('error').eql('Exercise not found');
        done();
      });
  });

  // Test for adding a new workout log
  describe('Workout Logs', () => {
    let exerciseId;
  
    // Add an exercise before testing workout logs
    beforeEach((done) => {
      const exercise = { name: 'Push-up', description: 'A bodyweight exercise' };
      db.run(`INSERT INTO Exercises (name, description) VALUES (?, ?)`, [exercise.name, exercise.description], function () {
        exerciseId = this.lastID;
        done();
      });
    });
  
    it('should add a new workout log', (done) => {
      const workoutLog = {
        exercise_id: exerciseId,
        date: '2024-01-01',
        repetitions: 15,
        sets: 3,
        weight: 20.0
      };
      request(app)
        .post('/exercises/workout-logs/add') // Ensure this matches the actual route
        .send(workoutLog)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message').eql('Workout log added successfully');
          expect(res.body).to.have.property('log_id');
          done();
        });
    });
  
    it('should retrieve all workout logs', (done) => {
      // Insert a workout log manually to ensure there is data to retrieve
      db.run(
        `INSERT INTO WorkoutLogs (exercise_id, date, repetitions, sets, weight) VALUES (?, ?, ?, ?, ?)`,
        [exerciseId, '2024-01-01', 15, 3, 20.0],
        () => {
          request(app)
            .get('/exercises/workout-logs') // Ensure this matches the actual route
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body).to.be.an('array');
              expect(res.body.length).to.be.at.least(1);
              done();
            });
        }
      );
    });
  });

  // Test for retrieving all body weight logs
  describe('Body Weight Logs', () => {
    it('should add a new body weight log', (done) => {
      const bodyWeightLog = {
        date: '2024-01-01',
        weight: 70.5
      };
  
      request(app)
        .post('/exercises/body-weight/add') // Matches with the route in exerciseRoutes.js
        .send(bodyWeightLog)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message').eql('Body weight log added successfully');
          expect(res.body).to.have.property('weight_id');
          done();
        });
    });
  
    it('should retrieve all body weight logs', (done) => {
      // Insert a body weight log to ensure there's data to retrieve
      db.run(`INSERT INTO BodyWeight (date, weight) VALUES (?, ?)`, ['2024-01-01', 70.5], () => {
        request(app)
          .get('/exercises/body-weight') // Matches with the route in exerciseRoutes.js
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.at.least(1);
            expect(res.body[0]).to.have.property('date').eql('2024-01-01');
            expect(res.body[0]).to.have.property('weight').eql(70.5);
            done();
          });
      });
    });
  });   
});
