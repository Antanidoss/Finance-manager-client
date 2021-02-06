import React from "react"
import classes from "./Report.module.css"
import {NavLink} from "react-router-dom";
import {removeReportThunkCreator, updateReportThunkCreator} from "../../../redux/report-reducer";

type PropsType = {
    id: number,
    amountSpent: number,
    descriptionsOfExpenses: string,
    timeOfCreate: string,
    removeReport: typeof removeReportThunkCreator,
    updateReport: typeof updateReportThunkCreator,
}

const Report: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.report}>
            <div className={classes.timeOfCreate}>
                <label>Время создания отчёта: {props.timeOfCreate}</label>
            </div>
            <div className={classes.descriptionsOfExpenses}>
                <label>Описания траты: {props.descriptionsOfExpenses}</label>
            </div>
            <div className={classes.amountSpent}>
                <label>Сумма траты: {props.amountSpent}</label>
            </div>
            <div className={classes.remove}>
                <button onClick={() => props.removeReport(props.id)}>Удалить</button>
            </div>
            <div className={classes.update}>
                <NavLink to={`/updateReport/${props.id}`}>
                    Обновить
                </NavLink>
            </div>
        </div>
    )
}

export default Report;