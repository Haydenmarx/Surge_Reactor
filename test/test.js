var request = require('request');
var expect = require('chai').expect;

const app = 'http://localhost:3000';






describe('Rider Login:', function() {
  it('Should exist/not send back an error for a valid request', (done) => {
    request('http://localhost:3000/login/1', (err, response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it('Should send back the correct rider. v1', (done) => {
    request('http://localhost:3000/login/1', (err, response, body) => {
      expect(JSON.parse(body).rider.id).to.equal(1);
      done();
    });
  });
  it('Should send back the correct rider. v5000', (done) => {
    request('http://localhost:3000/login/5000', (err, response, body) => {
      expect(JSON.parse(body).rider.id).to.equal(5000);
      done();
    });
  });
  it('Should send back 404 if rider doesn\'t exist', (done) => {
    request('http://localhost:3000/login/Illya', (err, response, body) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});


describe('Fake Matching/Surge:', function() {
  // it('Should exist/not send back an error for a valid request', (done) => {
  //   request('http://localhost:3000/surgeRate/', (err, response, body) => {
  //     console.log(err, response, body);
  //     expect(response.statusCode).to.equal(200);
  //     done();
  //   });
  // });
  // it('Should send back the correct rider. v1', (done) => {
  //   request('http://localhost:3000/login/1', (err, response, body) => {
  //     expect(JSON.parse(body).rider.id).to.equal(1);
  //     done();
  //   });
  // });
  // it('Should send back the correct rider. v5000', (done) => {
  //   request('http://localhost:3000/login/5000', (err, response, body) => {
  //     expect(JSON.parse(body).rider.id).to.equal(5000);
  //     done();
  //   });
  // });
  it('Should send back 404 if sent bad information', (done) => {
    request('http://localhost:3000/surgeRate/', (err, response, body) => {
      console.log(err, response, body);
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});