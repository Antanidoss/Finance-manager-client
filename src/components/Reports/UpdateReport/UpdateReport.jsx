import React from "react"
import {Field, reduxForm} from "redux-form";
import classes from "./UpdateReport.module.css"
import {Element} from "../../common/FormsControls/FormsControls";

class UpdateReport extends React.Component {
    onSubmit = (formData) => {
        this.props.updateReport(formData.amountSpent && this.props.report.amountSpent,
            formData.descriptionsOfExpenses && this.props.descriptionsOfExpenses, this.props.report.id);
    }
    render() {
        return (
            <div>
                <div className={classes.updateReportText}>
                    <h2>Обновить отчёт</h2>
                </div>
                <UpdateReportReduxForm {...this.props} onSubmit={this.onSubmit}></UpdateReportReduxForm>
            </div>
        )
    }
}

const UpdateReportForm = (props) => {
    let Textarea = Element("textarea");
    let Input = Element("input")
    return (
        <form onSubmit={props.handleSubmit} className={classes.updateReportForm}>
            <div className={classes.updateAmountSpentReport}>
                <label>Сумма траты</label>
                <Field placeholder={props.report.amountSpent} type="number" name="amountSpent" component={Textarea}></Field>
            </div>
            <div className={classes.updateDescriptionsOfExpensesReport}>
                <label>Описания траты</label>
                <Field placeholder={props.report.descriptionsOfExpenses} name="descriptionsOfExpenses" component={Input}></Field>
            </div>
            <div className={classes.updateReportButton}>
                <button type="reset">
                    Обновить
                </button>
            </div>
        </form>
    )
}

const UpdateReportReduxForm = reduxForm({
    form: "updateReport"
})(UpdateReportForm);

export default UpdateReport;