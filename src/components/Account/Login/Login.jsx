import React from "react"
import classes from "./Login.module.css"
import {NavLink} from "react-router-dom";

class Login extends React.Component {
    render() {
        debugger
        return (
            <div>
                <div>
                    <form className={classes.authForm}>
                        <div className={classes.emailInput}>
                            <input placeholder="Эл.почта" onChange={this.props.updateUserEmailForm} value={this.props.userEmailForm}/>
                        </div>
                        <div className={classes.passwordInput}>
                            <input  placeholder="Пароль" type="password" onChange={this.props.updateUserPasswordForm} value={this.props.userPasswordForm}/>
                        </div>
                        <div className={classes.isParsistentInput}>
                            <label>Запомнить:</label>
                            <input  type="checkbox" onChange={this.props.updateIsUserParsistentForm} value={this.props.isUserParsistentForm}/>
                        </div>
                        <div className={classes.button}>
                            <button type="reset" onClick={() => {this.props.auth(this.props.userEmailForm,
                                this.props.userPasswordForm, this.props.isUserParsistentForm)}}>Войти</button>
                        </div>
                        <div className={classes.reg}>
                            <NavLink to="/reg">Зарегестрироваться</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;