import React from "react"
import {Field, reduxForm} from "redux-form";

class UpdateReport extends React.Component {
    onSubmit = (formData) => {
        this.props.updateReport(formData.amountSpent, formData.descriptionsOfExpenses, this.props.report.id);
    }
    render() {
        debugger
        return (
            <div>
                <UpdateReportReduxForm {...this.props} onSubmit={this.onSubmit}></UpdateReportReduxForm>
            </div>
        )
    }
}

const UpdateReportForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <label>Сумма траты {props.report.amountSpent}</label>
                <Field type="number" name="amountSpent" component="input"></Field>
            </div>
            <div>
                <label>Описания траты {props.report.descriptionsOfExpenses}</label>
                <Field name="descriptionsOfExpenses" component="input"></Field>
            </div>
            <div>
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