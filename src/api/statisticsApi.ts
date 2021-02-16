import instanceAxios, {ResponseType} from "./instanceAxios";

type GetMonthlyStatisticsType = {
    year: number,
    monthNumber: number,
    amountSpentPerMonth: number,
    numberOfReportsPerMonth: number
}

export const statisticsApi = {
    getMonthlyStatistics(year: number, month: number){
        return instanceAxios.get<ResponseType<GetMonthlyStatisticsType>>(`/Statistics/get/month/${year}/${month}`)
            .then(res => res.data);
    }
}