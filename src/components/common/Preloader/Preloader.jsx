import React from "react"
import preloader from "../../../assets/images/preloader.svg";
import classes from "./Preloader.module.css"

const Preloader = (props) => {
    return (
        <div className={classes.preloader}>
            <img src={preloader}/>
        </div>
    )
}

export default Preloader;