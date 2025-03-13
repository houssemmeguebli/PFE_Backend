const reportService = require("../services/reportService");
const multer = require('multer'); // Import multer here

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files to uploads/
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});
const upload = multer({ storage }); // Define upload here

class ReportController {
    async createReport(req, res) {
        try {
            console.log('Request body:', req.body);
            console.log('Request files:', req.files);

            // Validation
            if (!req.body.userId) {
                return res.status(400).json({ error: "userId is required" });
            }
            if (!req.body.reportContent && !req.body.reportTitle) {
                return res.status(400).json({ error: "reportContent or reportTitle must be provided" });
            }

            // Process uploaded files
            const files = req.files ? req.files.map(file => ({
                fileName: file.originalname,
                filePath: file.path,
                fileType: file.mimetype,
                fileSize: file.size,
                uploadedAt: new Date().toISOString()
            })) : [];

            const reportData = {
                userId: req.body.userId,
                reportTitle: req.body.reportTitle,
                reportContent: req.body.reportContent,
                reportStatus: req.body.reportStatus || 'Pending',
                createdAt: req.body.createdAt || new Date(),
                lastUpdatedAt: req.body.lastUpdatedAt || null,
                files
            };
            const report = await reportService.createReport(reportData);
            res.status(201).json(report);
        } catch (error) {
            console.error('Error in createReport:', error);
            res.status(500).json({ error: error.message });
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

            // Fetch existing report
            const existingReport = await reportService.getReportById(req.params.id);
            if (!existingReport) {
                return res.status(404).json({ error: "Report not found" });
            }

            // Process new files (if any)
            const newFiles = req.files ? req.files.map(file => ({
                fileName: file.originalname,
                filePath: file.path,
                fileType: file.mimetype,
                fileSize: file.size,
                uploadedAt: new Date().toISOString()
            })) : [];

            // Merge new files with existing files
            const updatedFiles = [...existingReport.files, ...newFiles];

            const updateData = {
                reportTitle: req.body.reportTitle !== undefined ? req.body.reportTitle : existingReport.reportTitle,
                reportContent: req.body.reportContent !== undefined ? req.body.reportContent : existingReport.reportContent,
                reportStatus: req.body.reportStatus || existingReport.reportStatus,
                files: updatedFiles, // Merge files
                lastUpdatedAt: new Date()
            };

            const report = await reportService.updateReport(req.params.id, updateData);
            res.json(report);
        } catch (error) {
            console.error('Error in updateReport:', error);
            res.status(500).json({ error: error.message });
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

module.exports = { controller: new ReportController(), upload };