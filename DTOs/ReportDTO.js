class ReportDTO {
    constructor(report) {
        this.reportId = report.reportId;
        this.userId = report.userId;
        this.reportContent = report.reportContent;
        this.createdAt = report.createdAt;
        this.lastUpdatedAt = report.lastUpdatedAt;
        this.reportStatus = report.reportStatus;
    }
}

module.exports = ReportDTO;
