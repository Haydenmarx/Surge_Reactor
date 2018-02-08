const db = require('./config');

class Users {
  static getUser(userId) {
    const queryString = 'SELECT * FROM users where id =$1';
    return db.any(queryString, [userId]);
  }
}
module.exports = Users;