const Report = require("../models/Report");

class ReportRepository {
    // Fetch all reports
    async getAllReports() {
        return await Report.findAll();
    }

    // Fetch a single report by ID
    async getReportById(id) {
        return await Report.findByPk(id);
    }

    // Create a new report
    async createReport(reportData) {
        console.log('Repository creating report with data:', reportData);
        return await Report.create(reportData);
    }

    // Update an existing report
    async updateReport(id, updateData) {
        console.log('Repository updating report with data:', updateData);
        const [updatedCount] = await Report.update(updateData, {
            where: { reportId: id }
        });
        if (updatedCount === 0) return null;
        return await this.getReportById(id);
    }

    // Delete a report by ID
    async deleteReport(id) {
        const report = await this.getReportById(id);
        if (!report) return false;
        await report.destroy();
        return true;
    }
}

module.exports = new ReportRepository();