const express = require('express');
const {executeScript} = require("../controllers/PythonScriptController");

const router = express.Router();
router.post('/', executeScript);

module.exports = router;