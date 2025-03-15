const express = require('express');
const router = express.Router();
const { diskStorage } = require('multer');
const multer = require('multer');
const { controller } = require('../controllers/reportController');
const ReportService = require('../services/reportService');
// Configure multer storage
const storage = diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Initialize multer with fields configuration for POST and PUT
const uploadFields = multer({ storage: storage }).fields([
    { name: 'userId', maxCount: 1 },
    { name: 'reportTitle', maxCount: 1 },
    { name: 'reportContent', maxCount: 1 },
    { name: 'reportStatus', maxCount: 1 },
    { name: 'attachment', maxCount: 10 },
]);

// GET /api/v1/reports - Get all reports
router.get('/', controller.getAllReports);

// GET /api/v1/reports/:id - Get a report by ID
router.get('/:id', controller.getReportById);

// POST /api/v1/reports - Create a new report
router.post('/', uploadFields, async (req, res) => {
    try {
        const { userId, reportTitle, reportContent, reportStatus } = req.body;
        const files = req.files['attachment'] || [];

        console.log('Received data:', {
            userId,
            reportTitle,
            reportContent,
            reportStatus,
            files: files.map(f => f.originalname),
        });

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }
        if (!reportTitle || reportTitle.trim() === '') {
            return res.status(400).json({ error: 'reportTitle is required and cannot be empty' });
        }
        if (!reportContent || reportContent.trim() === '') {
            return res.status(400).json({ error: 'reportContent is required and cannot be empty' });
        }

        if (reportStatus && !['Pending', 'Approved', 'Rejected'].includes(reportStatus)) {
            return res.status(400).json({ error: 'reportStatus must be Pending, Approved, or Rejected' });
        }

        const filePaths = files.map(file => file.path);
        console.log('Processed file paths:', filePaths);

        const report = await controller.create({
            userId,
            reportTitle,
            reportContent,
            reportStatus,
            filePaths,
        });

        res.status(201).json({
            message: 'Report created successfully',
            data: report,
        });
    } catch (error) {
        console.error('Error processing report:', error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: 'Validation error: ' + error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT /api/v1/reports/:id - Update a report
router.put('/:id', uploadFields, controller.updateReport);

// DELETE /api/v1/reports/:id - Delete a report
router.delete('/:id', controller.deleteReport);

module.exports = router;