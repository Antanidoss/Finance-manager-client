import React from "react"
import classes from "./Paginator.module.css";

type PropsType = {
    updateCurrentPage: (newCurrentPage: number) => void
    totalPageCount: number
    currentPage: number
}

const Paginator: React.FC<PropsType> = (props) => {
    let pages = [];
    for (let i = 1; i <= props.totalPageCount; i++) {
        pages.push(i);
    }
    return (
        <div className={classes.pagination}>
            {
                pages.map(p => {
                    return <span key={p} className={(props.currentPage === p && classes.selectPage).toString()}
                                 onClick={() => {props.updateCurrentPage(p)}}>
                        <label key={p} className={classes.pageNumber}>{p}</label>
                    </span>
                })
            }
        </div>
    )
}

export default Paginator