import React, { useRef } from 'react'
import s from './Header.module.css'
import { Field, reduxForm } from 'redux-form'
import { useSelector } from 'react-redux'
import { length } from 'redux-form-validators'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'

let textInput = {}

const search = ({
    input,
    name,
    placeholder,
    autoComplete,
    type }) => {

    return (
        <input
            ref={textInput}
            {...input}
            name={name}
            autoComplete={autoComplete}
            placeholder={placeholder}
            type={type} />
    )
}

let Search = ({ handleSubmit }) => {

    const isDisabled = useSelector(state => state.search.isDisabled)
    textInput = useRef(null)

    const handleClick = () => {
        textInput.current.focus()
    }
    const intl = useIntl()
    let history = useHistory()

    const redirect = value => {

        return (
            history.push({
                pathname: '/shop',
                search: `?search=${value}`
            }) 
        )
    }

    return (
        <div className={s.search}>
            <form onSubmit={handleSubmit(values => redirect(values.search))}>
                <Field
                    placeholder={intl.formatMessage({
                        id: "search.look_for",
                        defaultMessage: "I'm looking for"
                    })}
                    autoComplete="search"
                    component={search}
                    name="search"
                    type="search"
                    validate={length({ min: 1, max: 30 })}
                />
                <button
                    onClick={handleClick}
                    disabled={isDisabled}
                    type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="24px" viewBox="0 0 512 512">
                        <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                    </svg>
                </button>
            </form>
        </div>
    )
}

Search = reduxForm({ form: 'search' })(Search)

export default Search