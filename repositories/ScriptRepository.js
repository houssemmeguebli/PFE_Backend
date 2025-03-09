const GenericRepository = require('./GenericRepository');
const Script = require('../models/Script');

class ScriptRepository extends GenericRepository {
    constructor() {
        super(Script);
    }

}

module.exports = new ScriptRepository();
