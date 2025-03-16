const { spawn } = require('child_process');

const runPythonScript = async (script, input = null) => {
    return new Promise((resolve, reject) => {
        try {
            // Log whether input is provided
            console.log('Input data sent to Python:', input ? JSON.stringify(input) : 'None');

            // Use the full path to Python with -u flag for unbuffered output
            const pythonCommand = 'C:\\Users\\megbl\\AppData\\Local\\Programs\\Python\\Python313\\python.exe';
            const pythonArgs = ['-u', '-c', script];
            console.log('Executing Python command:', pythonCommand, pythonArgs);

            const pythonProcess = spawn(pythonCommand, pythonArgs, { stdio: ['pipe', 'pipe', 'pipe'] });

            let output = '';
            let errorOutput = '';

            // Capture stdout
            pythonProcess.stdout.on('data', (data) => {
                const stdoutData = data.toString();
                console.log('Python stdout:', stdoutData);
                output += stdoutData;
            });

            // Capture stderr
            pythonProcess.stderr.on('data', (data) => {
                const stderrData = data.toString();
                console.error('Python stderr:', stderrData);
                errorOutput += stderrData;
            });

            // Handle process exit
            pythonProcess.on('close', (code) => {
                if (code !== 0) {
                    console.error('Python process exited with code:', code);
                    reject(new Error(errorOutput || `Python process exited with code ${code}`));
                } else {
                    console.log('Final output:', output);
                    resolve(output.trim());
                }
            });

            // Handle process errors
            pythonProcess.on('error', (err) => {
                console.error('Process error:', err.message);
                reject(new Error(`Process error: ${err.message}`));
            });

            // Pass input data to the Python process only if provided
            if (input) {
                const inputData = JSON.stringify(input);
                setTimeout(() => {
                    pythonProcess.stdin.write(inputData);
                    pythonProcess.stdin.end();
                    console.log('Input sent to Python process');
                }, 100);
            } else {
                // Close stdin immediately if no input is provided
                pythonProcess.stdin.end();
                console.log('No input provided, closing stdin');
            }

        } catch (error) {
            console.error('Execution setup error:', error.message);
            reject(new Error(`Setup error: ${error.message}`));
        }
    });
};

module.exports = { runPythonScript };