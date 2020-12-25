import React from "react"
import classes from "./Profile.module.css"

let Profile = (props) => {
    debugger
    return (
        <div className={classes.profile}>
            <div className={classes.name}>
                {props.userName}
            </div>
            <div className={classes.logoutButton}>
                <button onClick={props.logout}>Выйти</button>
            </div>
        </div>
    )
}

export default Profile;