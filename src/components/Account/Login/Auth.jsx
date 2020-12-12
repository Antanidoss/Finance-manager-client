import React from "react"

class Auth extends React.Component {
    render() {
        debugger
        return (
            <div>
                <div>
                    <form>
                        <div>
                            <label>Эл.почта</label>
                            <input onChange={this.props.updateUserEmailForm} value={this.props.userEmailForm}/>
                        </div>
                        <div>
                            <label>Пароль</label>
                            <input type="password" onChange={this.props.updateUserPasswordForm} value={this.props.userPasswordForm}/>
                        </div>
                        <div>
                            <label>Запомнить</label>
                            <input type="checkbox" onChange={this.props.updateIsUserParsistentForm} value={this.props.isUserParsistentForm}/>
                        </div>
                        <div>
                            <button type="reset" onClick={() => {this.props.auth(this.props.userEmailForm,
                                this.props.userPasswordForm, this.props.isUserParsistentForm)}}>Войти</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Auth;