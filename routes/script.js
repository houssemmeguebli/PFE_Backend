const express = require('express');
const scriptController = require('../controllers/ScriptController');

const router = express.Router();

router.get('/scripts', scriptController.getScripts);
router.get('/scripts/:scriptId', scriptController.getScriptById);
router.post('/scripts', scriptController.createScript);
router.put('/scripts/:scriptId', scriptController.updateScript);
router.delete('/scripts/:scriptId', scriptController.deleteScript);

module.exports = router;
