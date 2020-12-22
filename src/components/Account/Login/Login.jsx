import React from "react"
import classes from "./Login.module.css"
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, minLengthCreator, required} from "../../../unitls/validators";
import {Element} from "../../common/FormsControls/FormsControls";

class Login extends React.Component {
    onSubmit = (formData) => {
        this.props.auth(formData.email, formData.password, formData.isParsistent);
    }
    render() {
        return (
            <div>
              <LoginReduxForm onSubmit={this.onSubmit}></LoginReduxForm>
            </div>
        )
    }
}

const maxLengthEmail = maxLengthCreator(254);
const minLengthEmail = minLengthCreator(3);
const maxLengthPassword = maxLengthCreator(100);
const minLengthPassword = minLengthCreator(10);

const LoginForm = (props) => {
    const Input = Element("input");
    return (
        <form className={classes.authForm} onSubmit={props.handleSubmit}>
            <div className={classes.emailInput}>
                <Field component={Input} placeholder="Эл.почта" name="email" validate={[required, maxLengthEmail, minLengthEmail]}></Field>
            </div>
            <div className={classes.passwordInput}>
                <Field component={Input} placeholder="Пароль" type="password" name="password"
                       validate={[required, maxLengthPassword, minLengthPassword]}></Field>
            </div>
            <div className={classes.isParsistentInput}>
                <label>Запомнить:</label>
                <Field component={Input} type="checkbox" name="isParsistent"></Field>
            </div>
            <div className={classes.button}>
                <button>Войти</button>
            </div>
            <div className={classes.reg}>
                <NavLink to="/reg">Зарегестрироваться</NavLink>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: "login"
})(LoginForm);

export default Login;