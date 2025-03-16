const {runPythonScript} = require("../services/PythonScriptService");

const executeScript = async (req, res) => {
    const { script, input } = req.body;

    if (!script) {
        return res.status(400).json({ error: 'No script provided' });
    }

    try {
        const output = await runPythonScript(script, input);
        res.status(200).json({ message: 'Script executed successfully', output });
    } catch (error) {
        res.status(500).json({ error: 'Script execution failed', details: error.message });
    }
};

module.exports = { executeScript };