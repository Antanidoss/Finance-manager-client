import React, {useState} from "react"
import classes from "./Login.module.css"
import {NavLink, Redirect} from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, minLengthCreator, required} from "../../../unitls/validators";
import {Element} from "../../common/FormsControls/FormsControls";
import {PropsType} from "./LoginContainer";

type LoginFormValuesType = {
    email: string,
    password: string,
    isParsistent: boolean
}

const Login: React.FC<PropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.auth(formData.email, formData.password, formData.isParsistent);
    }
    if (props.isAuthenticated){
        return <Redirect to={`/${props.prevPath && "dailyReports"}`}></Redirect> //TODO:
    }
    return (
        <div>
            <LoginReduxForm onSubmit={onSubmit}></LoginReduxForm>
        </div>
    )
}

const maxLengthEmail = maxLengthCreator(254);
const minLengthEmail = minLengthCreator(3);
const maxLengthPassword = maxLengthCreator(100);
const minLengthPassword = minLengthCreator(10);

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType>> = (props) => {
    const Input = Element("input");
    return (
        <form className={classes.loginForm} onSubmit={props.handleSubmit}>
            <div className={classes.email}>
                <Field component={Input} placeholder="Эл.почта" name="email"
                       validate={[required, maxLengthEmail, minLengthEmail]}></Field>
            </div>
            <div className={classes.password}>
                <Field component={Input} placeholder="Пароль" type="password" name="password"
                       validate={[required, maxLengthPassword, minLengthPassword]}></Field>
            </div>
            <div className={classes.isParsistent}>
                <Field component={Input} type="checkbox" name="isParsistent"></Field>
                <label>Запомнить:</label>
            </div>
            {
                props.error && <div className={classes.formSummaryError}>
                    {props.error}
                </div>
            }
            <div className={classes.button}>
                <button>Войти</button>
            </div>
            <div className={classes.reg}>
                <NavLink to="/reg">Зарегестрироваться</NavLink>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType>({
    form: "login"
})(LoginForm);

export default Login;