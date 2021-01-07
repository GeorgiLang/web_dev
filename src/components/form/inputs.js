import React from 'react'
import Inputmask from 'react-input-mask'

export const input = ({
    input,
    label,
    style,
    placeholder,
    autoComplete,
    isLabel,
    type,
    meta: {
        touched,
        error,
        active,
        dirty,
        visited } }) => {

    return (
        <div className={style}>
            {isLabel && visited && (dirty || active) && <label>{label}</label>}
            <input
                {...input}
                autoComplete={autoComplete}
                type={type}
                placeholder={isLabel && !active ? placeholder : undefined} />
            {touched && (error && <p>{error}</p>) }
        </div>
    )
}

export const inputMask = ({
    input,
    label,
    placeholder,
    type,
    style,
    isLabel,
    mask,
    meta: {
        touched,
        error,
        active,
        dirty,
        visited } }) => {

    return (
        <div className={style}>
            {isLabel && visited && (dirty || active) && <label>{label}</label>}
            <Inputmask
                {...input}
                type={type}
                placeholder={placeholder}
                mask={mask} />
            {touched && (error && <p>{error}</p>)}
        </div>
    )
}