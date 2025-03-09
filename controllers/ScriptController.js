const ScriptService = require('../services/ScriptService');

// Get all scripts
exports.getScripts = async (req, res) => {
    try {
        const scripts = await ScriptService.getAll();
        res.json(scripts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get script by id
exports.getScriptById = async (req, res) => {
    try {
        const script = await ScriptService.getById(req.params.scriptId);
        if (!script) {
            return res.status(404).json({ message: 'Script not found' });
        }
        res.json(script);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new script
exports.createScript = async (req, res) => {
    try {
        const newScript = await ScriptService.create(req.body);
        res.status(201).json(newScript);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update an existing script
exports.updateScript = async (req, res) => {
    try {
        const updatedScript = await ScriptService.update(req.params.scriptId, req.body);
        if (!updatedScript) {
            return res.status(404).json({ message: 'Script not found' });
        }
        res.json(updatedScript);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a script
exports.deleteScript = async (req, res) => {
    try {
        const deleted = await ScriptService.delete(req.params.scriptId);
        if (deleted) {
            return res.status(200).json({ message: 'Script deleted successfully' });
        }
        res.status(404).json({ message: 'Script not found' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
