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
  it('Should send back 204 if rider doesn\'t exist', (done) => {
    request('http://localhost:3000/login/Illya', (err, response, body) => {
      expect(response.statusCode).to.equal(204);
      done();
    });
  });
  it('Should return with correct time', (done) => {
    request('http://localhost:3000/login/1', (err, response, body) => {
      let time = new Date();
      expect(JSON.parse(body).rider.timestamp.slice(0, 4) === time.getFullYear());
      expect(JSON.parse(body).rider.timestamp.slice(8, -8) === 
      ''.concat(time.getUTCMonth(), '-', time.getUTCDate(), 'T', time.getUTCHours(), ':', time.getMinutes())
      );
      done();
    });
  });
});