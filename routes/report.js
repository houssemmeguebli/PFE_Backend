const express = require('express');
const router = express.Router();
const { controller, upload } = require('../controllers/reportController');

router.get('/', controller.getAllReports);
router.get('/:id', controller.getReportById);
router.post('/', upload.array('attachments', 10), controller.createReport);
router.put('/:id', upload.array('attachments', 10), controller.updateReport); // Add multer here
router.delete('/:id', controller.deleteReport);

module.exports = router;