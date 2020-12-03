import React from "react"
import classes from "./Report.module.css"

class Report extends React.Component{
    render() {
        return (
            <div className={classes.report}>
                <div className={classes.timeOfCreate}>
                    <label>Время создания траты: {this.props.timeOfCreate}</label>
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
                    <button onClick={() => this.props.updateReport(this.props.id)}>Обновить</button>
                </div>
            </div>
        )
    }
}

export default Report;