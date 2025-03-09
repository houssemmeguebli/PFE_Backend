const GenericRepository = require('./GenericRepository');
const Report = require('../models/Report');  // Import the Report model

class ReportRepository extends GenericRepository {
    constructor() {
        super(Report);
    }

}

module.exports = new ReportRepository();
