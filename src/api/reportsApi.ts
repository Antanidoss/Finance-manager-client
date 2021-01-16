import instanceAxios, {ResultType} from "./instanceAxios";

type GetReportByIdReusltType = {
    id: number,
    amountSpent: number,
    descriptionsOfExpenses: string,
    timeOfCreate: string
}

export type ReportResultType = {
    id: number,
    amountSpent: number,
    descriptionsOfExpenses: string,
    timeOfCreate: string
}

type GetReportsResultType = {
    reports: Array<ReportResultType>,
    totalReportCount: number
}

type UpdateReportResultType = {
    result: ResultType
}

type AddReportResultType = {
    result: ResultType
}

type RemoveReportResultType = {
    result: ResultType
}

export const reportsApi = {
    getReports(skip: number, take: number, dailyReportId: number) {
        return  instanceAxios.get<GetReportsResultType>(`/Report/get/${skip}&${take}&${dailyReportId}`)
            .then(res => res.data)
    },
    removeReport(reportId: number) {
        return instanceAxios.delete<RemoveReportResultType>(`/Report/remove/${reportId}`)
            .then(res => res.data.result)
    },
    updateReport(amountSpent: number, descriptionsOfExpenses: string, reportId: number) {
        let updateReport = {amountSpent: amountSpent, descriptionsOfExpenses: descriptionsOfExpenses, reportId: reportId}
        return instanceAxios.put<UpdateReportResultType>(`/Report/update`, updateReport)
            .then(res => res.data.result)
    },
    getReportById(reportId: number) {
        return instanceAxios.get<GetReportByIdReusltType>(`/Report/get/${reportId}`)
            .then(res => res.data)
    },
    addReport(amountSpent: number, descriptionsOfExpenses: string) {
        return instanceAxios.post<AddReportResultType>("/Report/add", {amountSpent: amountSpent, descriptionsOfExpenses: descriptionsOfExpenses})
            .then(res => res.data.result)
    }
}