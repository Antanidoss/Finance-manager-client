import instanceAxios, {ResultType} from "./instanceAxios";
import {ResponseType} from "./instanceAxios";
import {ReportType} from "../types/types";

export type ReportResultType = {
    id: number,
    amountSpent: number,
    descriptionsOfExpenses: string,
    timeOfCreate: string
}

type GetReportByIdReusltType = {
    id: number,
    amountSpent: number,
    descriptionsOfExpenses: string,
    timeOfCreate: string
}

type GetReportsResultType = {
    reports: Array<ReportType>,
    totalReportCount: number
}


export const reportsApi = {
    getReports(skip: number, take: number, dailyReportId: number) {
        return  instanceAxios.get<ResponseType<GetReportsResultType>>(`/Report/get/${skip}&${take}&${dailyReportId}`)
            .then(res => res.data.data)
    },
    removeReport(reportId: number) {
        return instanceAxios.delete<ResultType>(`/Report/remove/${reportId}`)
            .then(res => res.data)
    },
    updateReport(amountSpent: number, descriptionsOfExpenses: string, reportId: number) {
        let updateReport = {
            amountSpent: amountSpent,
            descriptionsOfExpenses: descriptionsOfExpenses,
            reportId: reportId
        }
        return instanceAxios.put<ResultType>(`/Report/update`, updateReport)
            .then(res => res.data)
    },
    getReportById(reportId: number) {
        return instanceAxios.get<ResponseType<GetReportByIdReusltType>>(`/Report/get/${reportId}`)
            .then(res => res.data)
    },
    addReport(amountSpent: number, descriptionsOfExpenses: string) {
        return instanceAxios.post<ResultType>("/Report/add", {
            amountSpent: amountSpent,
            descriptionsOfExpenses: descriptionsOfExpenses
        }).then(res => res.data)
    }
}