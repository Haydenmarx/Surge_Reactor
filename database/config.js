const pgp = require('pg-promise')();


const config = {
  host: 'localhost',
  port: 5432,
  database: 'surge_reactor_riders',
  user: 'ubuntu'
};


const promiseConfig = pgp(config);

module.exports = promiseConfig;