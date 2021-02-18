export type DailyReportType = {
    id: number,
    timeOfCreate: string,
    reportsCount: number
    reports: Array<ReportType>
}

export type ReportType = {
    id: number,
    amountSpent: number,
    descriptionsOfExpenses: string
    timeOfCreate: string
}