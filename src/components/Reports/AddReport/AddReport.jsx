import React from "react"
import {Field, reduxForm} from "redux-form";
import classes from "./AddReport.module.css"

class AddReport extends React.Component {
    onSubmit = (formData) => {
        debugger;
        this.props.addReport(formData.amountSpent, formData.descriptionsOfExpenses)
    }
    render() {
        return (
            <div>
                <div className={classes.addReportText}>
                    <h2>Создать отчёт</h2>
                </div>
                <AddReportReduxForm onSubmit={this.onSubmit}></AddReportReduxForm>
            </div>
        )
    }
}

const AddReportForm = (props) => {
        return (
            <form onSubmit={props.handleSubmit} className={classes.addReportForm}>
                <div className={classes.amountSpent}>
                    <Field placeholder="Сумма траты" component="input" name="amountSpent"></Field>
                </div>
                <div className={classes.descriptionsOfExpenses}>
                    <Field placeholder="Описания траты" component="textarea" name="descriptionsOfExpenses"></Field>
                </div>
                <div className={classes.addReportButton}>
                    <button>
                        Создать отчёт
                    </button>
                </div>
            </form>
        )
}

const AddReportReduxForm = reduxForm({
    form: 'addReport'
})(AddReportForm);

export default AddReport;