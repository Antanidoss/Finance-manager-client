import instanceAxios from "./instanceAxios";

export const reportsApi = {
    getReports(skip, take, dailyReportId) {
        return  instanceAxios.get(`/Report/get/${skip}&${take}&${dailyReportId}`)
            .then(res => res.data)
    },
    removeReport(reportId) {
        return instanceAxios.delete(`/Report/remove/${reportId}`)
            .then(res => res.data)
    },
    updateReport(amountSpent, descriptionsOfExpenses, reportId) {
        let updateReport = {amountSpent: amountSpent, descriptionsOfExpenses: descriptionsOfExpenses, reportId: reportId}
        return instanceAxios.put(`/Report/update`, updateReport)
            .then(res => res.data)
    },
    getReportById(reportId) {
        return instanceAxios.get(`/Report/get/${reportId}`)
            .then(res => res.data)
    },
    addReport(amountSpent, descriptionsOfExpenses){
        return instanceAxios.post("/Report/add", {amountSpent: amountSpent, descriptionsOfExpenses: descriptionsOfExpenses})
            .then(res => res.data)
    }
}