import React from "react"
import {Field, reduxForm} from "redux-form";
import classes from "./UpdateReport.module.css"
import {Element} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, minLengthCreator, required} from "../../../unitls/validators";

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

const maxLength300 = maxLengthCreator(300);
const minLength3 = minLengthCreator(3);

const UpdateReportForm = (props) => {
    let Textarea = Element("textarea");
    let Input = Element("input")
    return (
        <form onSubmit={props.handleSubmit} className={classes.updateReportForm}>
            <div className={classes.amountSpent}>
                <label>Сумма траты</label>
                <Field placeholder={props.report.amountSpent} type="number" name="amountSpent" component={Input}></Field>
            </div>
            <div className={classes.descriptionsOfExpenses}>
                <label>Описания траты</label>
                <Field validate={[required, maxLength300, minLength3]}
                       placeholder={props.report.descriptionsOfExpenses} name="descriptionsOfExpenses" component={Textarea}></Field>
            </div>
            {
                props.error && <div className={classes.formSummaryError}>
                    {props.error}
                </div>
            }
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