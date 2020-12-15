import React from "react"
import {Field, reduxForm} from "redux-form";

class AddReport extends React.Component {
    onSubmit = (formData) => {
        debugger;
        this.props.addReport(formData.amountSpent, formData.descriptionsOfExpenses)
    }
    render() {
        return (
            <div>
                <AddReportReduxForm onSubmit={this.onSubmit}></AddReportReduxForm>
            </div>
        )
    }
}

const AddReportForm = (props) => {
        return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder="Сумма траты" component="input" name="amountSpent"></Field>
                </div>
                <div>
                    <Field placeholder="Описания траты" component="textarea" name="descriptionsOfExpenses"></Field>
                </div>
                <div>
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