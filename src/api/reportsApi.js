import instanceAxios from "./instanceAxios";

export const reportsApi = {
    getReports(skip, take, dailyReportId) {
        return  instanceAxios.get(`/Report/get/${skip}&${take}&${dailyReportId}`)
            .then(res => res.data)
    }
}