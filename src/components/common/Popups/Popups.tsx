import React from "react";
import classes from "./Popups.module.css"
import {PropsType} from "./PopupsContainer"

const Popups: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.popups}>
            <div className={classes.body}>
                <div className={classes.content}>
                    <div className={classes.close}>
                        <button onClick={() => props.toggleIsPopupsActive(false)}>X</button>
                    </div>
                    <div className={classes.message}>
                        {props.message}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popups;