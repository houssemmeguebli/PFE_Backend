class ScriptDTO {

    constructor(script) {
        this.scriptId = script.scriptId;
        this.userId=script.userId;
        this.scriptName = script.scriptName;
        this.scriptContent = script.scriptContent;
        this.createdAt = script.createdAt;
        this.lastUpdatedAt = script.lastUpdatedAt;
    }
}

module.exports = ScriptDTO;
