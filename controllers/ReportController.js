const reportService = require('../services/reportService');

class ReportController {
    async create(reportData) {
        try {
            const { userId, reportTitle, reportContent, reportStatus, filePaths } = reportData;

            // Transform filePaths into the format expected by reportService
            const files = filePaths ? filePaths.map(filePath => ({
                fileName: filePath.split('/').pop(),
                filePath,
                fileType: 'unknown',
                fileSize: 0,
                uploadedAt: new Date().toISOString(),
            })) : [];

            const reportDataForService = {
                userId,
                reportTitle,
                reportContent,
                reportStatus: reportStatus || 'Pending',
                lastUpdatedAt: null,
                files,
            };

            const report = await reportService.createReport(reportDataForService);
            return report;
        } catch (error) {
            console.error('Error in createReport:', error);
            throw error;
        }
    }

    async getAllReports(req, res) {
        try {
            const reports = await reportService.getAllReports();
            res.json(reports);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getReportById(req, res) {
        try {
            const report = await reportService.getReportById(req.params.id);
            res.json(report);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async updateReport(req, res) {
        try {
            console.log('Update request body:', req.body);
            console.log('Update request files:', req.files);

            const reportId = req.params.id;
            if (!reportId) {
                return res.status(400).json({ error: 'Report ID is required' });
            }

            const existingReport = await reportService.getReportById(reportId);
            if (!existingReport) {
                return res.status(404).json({ error: 'Report not found' });
            }

            const { reportTitle, reportContent, reportStatus } = req.body || {};
            if (reportTitle !== undefined && (!reportTitle || reportTitle.trim() === '')) {
                return res.status(400).json({ error: 'reportTitle cannot be empty' });
            }
            if (reportContent !== undefined && (!reportContent || reportContent.trim() === '')) {
                return res.status(400).json({ error: 'reportContent cannot be empty' });
            }
            if (reportStatus && !['Pending', 'Approved', 'Rejected'].includes(reportStatus)) {
                return res.status(400).json({ error: 'reportStatus must be Pending, Approved, or Rejected' });
            }

            let newFiles = [];
            if (req.files && req.files['attachment']) {
                newFiles = Array.isArray(req.files['attachment'])
                    ? req.files['attachment']
                    : [req.files['attachment']];
                newFiles = newFiles.map(file => ({
                    fileName: file.originalname,
                    filePath: file.path,
                    fileType: file.mimetype || 'unknown',
                    fileSize: file.size || 0,
                    uploadedAt: new Date().toISOString(),
                }));
            }

            let updatedFiles = [...(existingReport.files || [])];
            if (req.body && req.body.existingFiles) {
                try {
                    const existingFiles = JSON.parse(req.body.existingFiles);
                    if (Array.isArray(existingFiles)) {
                        updatedFiles = existingFiles.map(file => ({
                            fileName: file.fileName || file.filePath.split('/').pop(),
                            filePath: file.filePath,
                            fileType: file.fileType || 'unknown',
                            fileSize: file.fileSize || 0,
                            uploadedAt: file.uploadedAt || new Date().toISOString(),
                        }));
                    }
                } catch (e) {
                    console.error('Error parsing existingFiles:', e);
                    return res.status(400).json({ error: 'Invalid existingFiles format' });
                }
            }
            updatedFiles = [...updatedFiles, ...newFiles];

            const updateData = {
                reportTitle: reportTitle || existingReport.reportTitle,
                reportContent: reportContent || existingReport.reportContent,
                reportStatus: reportStatus || existingReport.reportStatus,
                files: updatedFiles.length > 0 ? updatedFiles : existingReport.files,
                lastUpdatedAt: new Date(),
            };

            const report = await reportService.updateReport(reportId, updateData);
            res.status(200).json({
                message: 'Report updated successfully',
                data: report,
            });
        } catch (error) {
            console.error('Error in updateReport:', error);
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({ error: 'Validation error: ' + error.message });
            }
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async deleteReport(req, res) {
        try {
            const success = await reportService.deleteReport(req.params.id);
            res.json({ success });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = { controller: new ReportController() };