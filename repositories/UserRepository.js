
const GenericRepository = require('./GenericRepository');
const User = require('../models/User');  // Import the User model

class UserRepository extends GenericRepository {
    constructor() {
        super(User);
    }

}

module.exports = new UserRepository();
