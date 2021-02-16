import React from "react";
import {PropsType} from "../Statistics/StatisticsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Element} from "../common/FormsControls/FormsControls";
import {required} from "../../unitls/validators";
import classes from "./Statistics.module.css"

type GetStatisticsFormValueType = {
    year: number,
    monthNumber: number
}

const Statistics: React.FC<PropsType> = (props) => {
    const onSubmit = (data: GetStatisticsFormValueType) => {
        props.requestMonthlyStatistics(data.year, data.monthNumber);
    }
    return (
        <>
            <GetReportStatisticsReduxForm onSubmit={onSubmit}></GetReportStatisticsReduxForm>
            {
                props.monthlyStatistics != null
                    ? <div className={classes.statistics}>
                        <div className={classes.numberOfReportsPerMonth}>
                            Количество отчётов за месяц: {props.monthlyStatistics.numberOfReportsPerMonth}
                        </div>
                        <div className={classes.amountSpentPerMonth}>
                            Общая сумма, потраченая за месяц: {props.monthlyStatistics.amountSpentPerMonth}
                        </div>
                    </div>
                    : null
            }
        </>
    )
}

const GetReportStatisticsForm: React.FC<InjectedFormProps<GetStatisticsFormValueType>> = ({handleSubmit, error}) => {
    const Input = Element("input")
    const Select = Element("select")
    return (
        <>
            <div className={classes.getStatisticsForm}>
                <form onSubmit={handleSubmit}>
                    <div className={classes.year}>
                        <label>Введите год</label>
                        <Field component={Input} name="year" defaultValue={(new Date().getUTCFullYear()).toString()} validate={[required]}></Field>
                    </div>
                    <div className={classes.submit}>
                        <button>
                            Показать статистику
                        </button>
                    </div>
                    <div className={classes.monthNumber}>
                        <label>Выбирите месяц:</label>
                        <Field name="monthNumber" validate={[required]} component={Select}>
                            <option value="1">Январь</option>
                            <option value="2">Февраль</option>
                            <option value="3">Март</option>
                            <option value="4">Апрель</option>
                            <option value="5">Май</option>
                            <option value="6">Июнь</option>
                            <option value="7">Июль</option>
                            <option value="8">Август</option>
                            <option value="9">Сентябрь</option>
                            <option value="10">Октябрь</option>
                            <option value="11">Ноябрь</option>
                            <option value="12">Декабрь</option>
                        </Field>
                    </div>
                    {
                        error && <div className={classes.formSummaryError}>
                            {error}
                        </div>
                    }
                </form>
            </div>
        </>
    )
}

const GetReportStatisticsReduxForm = reduxForm<GetStatisticsFormValueType>({
    form: 'getStatistics'
})(GetReportStatisticsForm);

export default Statistics