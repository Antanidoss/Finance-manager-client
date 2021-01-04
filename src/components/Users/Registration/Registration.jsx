import React from "react"
import {Element} from "../../common/FormsControls/FormsControls";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, minLengthCreator, required} from "../../../unitls/validators";
import {NavLink} from "react-router-dom";
import classes from "./Registration.module.css"

const Registration = (props) => {
    const onSubmit = (formData) => {
        props.registration(formData.name, formData.email, formData.password);
    }
    return (
        <div>
            <RegistrationReduxForm {...props} onSubmit={onSubmit}></RegistrationReduxForm>
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

const RegistrationForm = (props) => {
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
                props.error && props.error.map(e => {
                    return (
                        <div className={classes.formSummaryError}>
                            {e}
                        </div>
                    )
                })
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

const RegistrationReduxForm = reduxForm({
    form: "registration"
})(RegistrationForm);

export default Registration;