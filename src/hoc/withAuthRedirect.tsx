import React from "react"
import {Redirect} from "react-router-dom";

export const withAuthRedirect = (Component: React.ComponentType) => {
    function RedirectComponent<P extends {isAuthenticated: boolean}>(props: P)  {
        if (!props.isAuthenticated) return <Redirect to="/auth"></Redirect>
        return <Component {...props}></Component>
    }

    return RedirectComponent;
}