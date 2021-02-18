import instanceAxios from "./instanceAxios";
import {ReportResultType} from "./reportsApi";
import {ResponseType} from "./instanceAxios";

type DailyReportResult = {
    id: number,
    reports: Array<ReportResultType>
    timeOfCreate: string,
    reportsCount: number
}

type GetDailyReportsResultType = {
    dailyReports: Array<DailyReportResult>,
    totalDailyReportCount: number
}

export const dailyReportsApi = {
    getDailyReports(skip: number, take: number) {
        return instanceAxios.get<ResponseType<GetDailyReportsResultType>>(`/DailyReport/get/${skip}&${take}`)
            .then(res => {
                return res.data
            })
    }
}