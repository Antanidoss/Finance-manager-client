import instanceAxios from "./instanceAxios";

export const dailyReportsApi = {
    getDailyReports(skip, take) {
        return instanceAxios.get(`/DailyReport/get/${skip}&${take}`)
            .then(res => res.data)
    }
}