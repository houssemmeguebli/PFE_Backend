const ReportRepository = require('../repositories/reportRepository');
const GenericService = require('./genericService');

class ReportService extends GenericService {
    constructor() {
        super(ReportRepository);
    }

}

module.exports = new ReportService();
