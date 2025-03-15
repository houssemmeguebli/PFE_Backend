const reportRepository = require("../repositories/reportRepository");
const fs = require('fs').promises; // Use promise-based fs
class ReportService {
    // Get all reports
    async getAllReports() {
        try {
            return await reportRepository.getAllReports();
        } catch (error) {
            throw new Error(`Failed to fetch reports: ${error.message}`);
        }
    }

    // Get a report by ID
    async getReportById(id) {
        try {
            const report = await reportRepository.getReportById(id);
            if (!report) throw new Error("Report not found");
            return report;
        } catch (error) {
            throw new Error(`Failed to fetch report: ${error.message}`);
        }
    }

    // Create a new report
    async createReport(reportData) {
        try {
            console.log('Service creating report with data:', reportData);
            return await reportRepository.createReport(reportData);
        } catch (error) {
            throw new Error(`Failed to create report: ${error.message}`);
        }
    }

    // Update a report
    async updateReport(reportId, updateData) {
        const report = await reportRepository.getReportById(reportId);
        if (!report) throw new Error('Report not found');

        // Log the current and updated file lists
        console.log('Current files:', report.files);
        console.log('Updated files:', updateData.files);

        // Get current file paths
        const currentFilePaths = new Set((report.files || []).map(file => file.filePath));

        // Update report data
        const updatedReport = await report.update(updateData);

        // Delete files that are no longer in the updated file list
        const newFilePaths = new Set((updateData.files || []).map(file => file.filePath));
        for (const filePath of currentFilePaths) {
            if (!newFilePaths.has(filePath)) {
                try {
                    await fs.unlink(filePath); // Use promise-based unlink
                    console.log(`Deleted file: ${filePath}`);
                } catch (error) {
                    console.error(`Failed to delete file ${filePath}:`, error);
                    // Continue despite deletion failure
                }
            }
        }

        return updatedReport;
    }

    async deleteReport(reportId) {
        const report = await Report.findByPk(reportId);
        if (!report) throw new Error('Report not found');

        // Delete all associated files
        for (const file of report.files || []) {
            try {
                await fs.unlink(file.filePath);
                console.log(`Deleted file: ${file.filePath}`);
            } catch (error) {
                console.error(`Failed to delete file ${file.filePath}:`, error);
            }
        }

        return await report.destroy();
    }
    // Delete a report
    async deleteReport(id) {
        try {
            const report = await reportRepository.getReportById(id);
            if (!report) throw new Error("Report not found");
            const deleted = await reportRepository.deleteReport(id);
            if (!deleted) throw new Error("Failed to delete report");
            return true;
        } catch (error) {
            throw new Error(`Failed to delete report: ${error.message}`);
        }
    }
}

module.exports = new ReportService();