import React from "react"
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import classes from "./UpdateReport.module.css"
import {Element} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, minLengthCreator, range, required} from "../../../unitls/validators";
import {updateReport} from "../../../redux/report-reducer";
import {PropsType} from "./UpdateReportContainer";
import {ReportType} from "../../../types/types";

type UpdateReportFormValuesType = {
    amountSpent: number,
    descriptionsOfExpenses: string
}

const UpdateReport: React.FC<PropsType> = (props) => {
    const onSubmit = (formData: UpdateReportFormValuesType) => {
        props.updateReport(formData.amountSpent && props.report.amountSpent,
            formData.descriptionsOfExpenses && props.report.descriptionsOfExpenses, props.report.id);
    }
    return (
        <div>
            <div className={classes.updateReportText}>
                <h2>Обновить отчёт</h2>
            </div>
            <UpdateReportReduxForm {...props.report} onSubmit={onSubmit}></UpdateReportReduxForm>
        </div>
    )
}

const maxLength300 = maxLengthCreator(300);
const minLength3 = minLengthCreator(3);
const rangeFrom0ToMilion = range(0, 1000000);

type FormPropsType = InjectedFormProps<UpdateReportFormValuesType, ReportType> & ReportType;
let Textarea = Element("textarea");
let Input = Element("input");

class UpdateReportForm extends  React.Component<FormPropsType> {
    render()
    {
        return (
            <form onSubmit={this.props.handleSubmit} className={classes.updateReportForm}>
                <div className={classes.amountSpent}>
                    <label>Сумма траты</label>
                    <Field validate={[required, rangeFrom0ToMilion]} placeholder={this.props.amountSpent} type="number" name="amountSpent"
                           component={Input}></Field>
                </div>
                <div className={classes.descriptionsOfExpenses}>
                    <label>Описания траты</label>
                    <Field validate={[required, maxLength300, minLength3]}
                           placeholder={this.props.descriptionsOfExpenses} name="descriptionsOfExpenses"
                           component={Textarea}></Field>
                </div>
                {
                    this.props.error && <div className={classes.formSummaryError}>
                        {this.props.error}
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
}

const UpdateReportReduxForm = reduxForm<UpdateReportFormValuesType, ReportType>({
    form: "updateReport"
})(UpdateReportForm);

export default UpdateReport;