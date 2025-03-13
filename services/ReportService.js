const reportRepository = require("../repositories/reportRepository");

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
    async updateReport(id, updateData) {
        try {
            const existingReport = await reportRepository.getReportById(id);
            if (!existingReport) throw new Error("Report not found");

            // Delete old files if replacing
            if (updateData.files && updateData.files !== existingReport.files) {
                for (const file of existingReport.files) {
                    try {
                        await fs.unlink(file.filePath);
                        console.log(`Deleted old file: ${file.filePath}`);
                    } catch (fileError) {
                        console.error(`Failed to delete file ${file.filePath}:`, fileError);
                    }
                }
            }

            const report = await reportRepository.updateReport(id, updateData);
            if (!report) throw new Error("Report not found");
            return report;
        } catch (error) {
            throw new Error(`Failed to update report: ${error.message}`);
        }
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