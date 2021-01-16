import instanceAxios from "./instanceAxios";
import {ReportResultType} from "./reportsApi";

type DailyReportResult = {
    id: number,
    reports: Array<ReportResultType>
    timeOfCreate: string
}

type GetDailyReportsResultType = {
    dailyReports: Array<DailyReportResult>,
    totalDailyReportCount: number
}

export const dailyReportsApi = {
    getDailyReports(skip: number, take: number) {
        return instanceAxios.get<GetDailyReportsResultType>(`/DailyReport/get/${skip}&${take}`)
            .then(res => {
                return res.data
            })
    }
}