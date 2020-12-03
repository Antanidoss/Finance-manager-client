import React from "react"

class Login extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <form>
                        <div>
                            <input onChange={this.props.updateUserEmailForm}/>
                        </div>
                        <div>
                            <input onChange={this.props.updateUserPasswordForm}/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;