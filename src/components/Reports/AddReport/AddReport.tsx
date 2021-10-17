import React from "react"
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import classes from "./AddReport.module.css"
import {maxLengthCreator, minLengthCreator, range, required} from "../../../unitls/validators";
import {Element} from "../../common/FormsControls/FormsControls";
import {PropsType} from "./AddReportContainer";

type AddReportFormValuesType = {
    amountSpent: number,
    descriptionsOfExpenses: string
}

const AddReport: React.FC<PropsType> = (props) => {
    const onSubmit = (formData: AddReportFormValuesType) => {
        props.addReport(formData.amountSpent, formData.descriptionsOfExpenses)
    }
    return (
        <div>
            <div className={classes.addReportText}>
                <h2>Создать отчёт</h2>
            </div>
            <AddReportReduxForm onSubmit={onSubmit}></AddReportReduxForm>
        </div>
    )
}

const maxLength300 = maxLengthCreator(300);
const minLength3 = minLengthCreator(3);
const rangeFrom0ToMilion = range(0, 1000000);

const AddReportForm: React.FC<InjectedFormProps<AddReportFormValuesType>> = ({handleSubmit, error}) => {
    const Textarea = Element("textarea");
    const Input = Element("input")
    return (
        <form onSubmit={handleSubmit} className={classes.addReportForm}>
            <div className={classes.amountSpent}>
                <Field placeholder="Сумма траты" component={Input} name="amountSpent" validate={[required, rangeFrom0ToMilion]} type="number"></Field>
            </div>
            <div className={classes.descriptionsOfExpenses}>
                <Field placeholder="Описания траты" component={Textarea} name="descriptionsOfExpenses" validate={[required, maxLength300, minLength3]}></Field>
            </div>
            {
                error && <div className={classes.formSummaryError}>
                    {error}
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

const AddReportReduxForm = reduxForm<AddReportFormValuesType>({
    form: 'addReport'
})(AddReportForm);

export default AddReport;