import React from "react"
import {Redirect} from "react-router-dom";

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            debugger
            if (!this.props.isAuthenticated) return <Redirect to="/auth"></Redirect>
            return <Component {...this.props}></Component>
        }
    }

    return RedirectComponent;
}