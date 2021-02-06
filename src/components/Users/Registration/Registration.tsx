import React from "react"
import {Element} from "../../common/FormsControls/FormsControls";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, minLengthCreator, required} from "../../../unitls/validators";
import {NavLink, Redirect} from "react-router-dom";
import classes from "./Registration.module.css"
import { PropsType } from "./RegistrationContainer";

type RegFormValuesType = {
    name: string
    email: string,
    password: string,
}

const Registration: React.FC<PropsType> = (props) => {
    const onSubmit = (formData: RegFormValuesType) => {
        props.registration(formData.name, formData.email, formData.password);
    }
    if (props.isAuthenticated){
        return <Redirect to="/dailyReports"></Redirect>
    }
    return (
        <div>
            <RegistrationReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const Input = Element("input")
const maxLengthEmail = maxLengthCreator(254);
const minLengthEmail = minLengthCreator(3);
const maxLengthPassword = maxLengthCreator(100);
const minLengthPassword = minLengthCreator(10);
const maxLengthName = maxLengthCreator(50);
const minLengthName = minLengthCreator(2)

const RegistrationForm: React.FC<InjectedFormProps<RegFormValuesType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={classes.regForm}>
            <div>
                <Field component={Input} validate={[required, maxLengthName, minLengthName]} placeholder="Имя" name="name"></Field>
            </div>
            <div>
                <Field component={Input} validate={[required, maxLengthEmail, minLengthEmail]} placeholder="Эл.почта" name="email"></Field>
            </div>
            <div>
                <Field component={Input} validate={[required, maxLengthPassword, minLengthPassword]} placeholder="Пароль" name="password"></Field>
            </div>
            {
                props.error && <div className={classes.formSummaryError}>
                    {props.error}
                </div>
            }
            <div className={classes.button}>
                <button>Зарегестрироваться</button>
            </div>
            <div className={classes.auth}>
                <NavLink to="/auth">Войти</NavLink>
            </div>
        </form>
    )
}

const RegistrationReduxForm = reduxForm<RegFormValuesType>({
    form: "registration"
})(RegistrationForm);

export default Registration;