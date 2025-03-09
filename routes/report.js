const express = require('express');
const reportController = require('../controllers/ReportController');

const router = express.Router();

// Define routes for reports
router.get('/reports', reportController.getReports);            // Get all reports
router.get('/reports/:reportId', reportController.getReportById); // Get report by ID
router.post('/reports', reportController.createReport);         // Create a new report
router.put('/reports/:reportId', reportController.updateReport); // Update report
router.delete('/reports/:reportId', reportController.deleteReport); // Delete report

module.exports = router;
