const SerialPort = require("serialport");

async function listPorts() {
    try {
        const ports = await SerialPort.list();
        console.log("Available serial ports:", ports);
    } catch (error) {
        console.error("Error listing serial ports:", error);
    }
}

export default listPorts();
