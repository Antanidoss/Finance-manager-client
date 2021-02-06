import React from "react"
import { WrappedFieldProps } from "redux-form";
import classes from "./FormsControls.module.css"

export const Element = (Element: keyof JSX.IntrinsicElements) => ({input, meta, ...props}: WrappedFieldProps) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={ classes.formControl + " " + (hasError ? classes.error : "") }>
            <Element {...input} {...props}></Element>
            { hasError && <span> { meta.error } </span> }
        </div>
    );
}

