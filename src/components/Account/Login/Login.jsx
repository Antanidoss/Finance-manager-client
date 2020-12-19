import React from "react"
import classes from "./Login.module.css"
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";

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

const LoginForm = (props) => {
    return (
        <form className={classes.authForm} onSubmit={props.handleSubmit}>
            <div className={classes.emailInput}>
                <Field component="input" placeholder="Эл.почта" name="email"></Field>
            </div>
            <div className={classes.passwordInput}>
                <Field component="input" placeholder="Пароль" type="password" name="password"></Field>
            </div>
            <div className={classes.isParsistentInput}>
                <label>Запомнить:</label>
                <Field component="input" type="checkbox" name="isParsistent"></Field>
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