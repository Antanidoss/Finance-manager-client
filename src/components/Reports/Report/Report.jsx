import React from "react"
import classes from "./Report.module.css"
import {NavLink} from "react-router-dom";

class Report extends React.Component{
    render() {
        return (
            <div className={classes.report}>
                <div className={classes.timeOfCreate}>
                    <label>Время создания отчёта: {this.props.timeOfCreate}</label>
                </div>
                <div className={classes.descriptionsOfExpenses}>
                    <label>Описания траты: {this.props.descriptionsOfExpenses}</label>
                </div>
                <div className={classes.amountSpent}>
                    <label>Сумма траты: {this.props.amountSpent}</label>
                </div>
                <div className={classes.remove}>
                    <button onClick={() => this.props.removeReport(this.props.id)}>Удалить</button>
                </div>
                <div className={classes.update}>
                    <NavLink to={`/updateReport/${this.props.id}`}>
                        Обновить
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default Report;