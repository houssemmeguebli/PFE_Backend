// services/userService.js
const UserRepository = require('../repositories/userRepository');  // Import the user repository
const GenericService = require('./GenericService');

class UserService extends GenericService {
    constructor() {
        super(UserRepository);
    }

}

module.exports = new UserService();
