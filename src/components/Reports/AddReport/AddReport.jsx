import React from "react"
import {Field, reduxForm} from "redux-form";
import classes from "./AddReport.module.css"
import {maxLengthCreator, minLengthCreator, required} from "../../../unitls/validators";
import {Element, Textarea} from "../../common/FormsControls/FormsControls";

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

const maxLength300 = maxLengthCreator(300);
const minLength3 = minLengthCreator(3);

const AddReportForm = (props) => {
    const Textarea = Element("textarea");
    const Input = Element("input")
        return (
            <form onSubmit={props.handleSubmit} className={classes.addReportForm}>
                <div className={classes.amountSpent}>
                    <Field placeholder="Сумма траты" component={Input} name="amountSpent" validate={[required]} type="number"></Field>
                </div>
                <div className={classes.descriptionsOfExpenses}>
                    <Field placeholder="Описания траты" component={Textarea} name="descriptionsOfExpenses"
                           validate={[required, maxLength300, minLength3]}></Field>
                </div>
                {
                    props.error && <div className={classes.formSummaryError}>
                        {props.error}
                    </div>
                }
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