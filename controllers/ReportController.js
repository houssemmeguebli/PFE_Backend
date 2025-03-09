const ReportService = require('../services/RepoService');

// Get all reports
exports.getReports = async (req, res) => {
    try {
        const reports = await ReportService.getAll();
        res.json(reports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get report by id
exports.getReportById = async (req, res) => {
    try {
        const report = await ReportService.getById(req.params.reportId);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.json(report);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new report
exports.createReport = async (req, res) => {
    try {
        const newReport = await ReportService.create(req.body);
        res.status(201).json(newReport);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update an existing report
exports.updateReport = async (req, res) => {
    try {
        const updatedReport = await ReportService.update(req.params.reportId, req.body);
        if (!updatedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.json(updatedReport);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a report
exports.deleteReport = async (req, res) => {
    try {
        const deleted = await ReportService.delete(req.params.reportId);
        if (deleted) {
            return res.status(200).json({ message: 'Report deleted successfully' });
        }
        res.status(404).json({ message: 'Report not found' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
