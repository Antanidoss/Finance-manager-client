import React from "react"
import classes from "./Profile.module.css"
import { PropsType } from "./ProfileContainer"

const Profile: React.FC<PropsType> = (props) => {
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