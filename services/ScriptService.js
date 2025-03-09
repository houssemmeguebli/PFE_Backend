const ScriptRepository = require('../repositories/ScriptRepository');
const GenericService = require('./genericService');

class ScriptService extends GenericService {
    constructor() {
        super(ScriptRepository);
    }

}

module.exports = new ScriptService();
