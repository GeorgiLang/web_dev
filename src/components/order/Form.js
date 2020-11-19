import React from 'react'
import { Field } from 'redux-form'
import { combine, required, length, format, email } from 'redux-form-validators'
import { FormattedMessage, useIntl } from 'react-intl'
import Preloader from '../../common/Preloader'
import Inputmask from 'react-input-mask'
import s from './Order.module.css'

const renderInput = ({
    input,
    label,
    placeholder,
    type,
    meta: {
        touched,
        error,
        active,
        dirty,
        visited } }) => {

    return (
        <div className={s.input_wrap}>
            {visited && (dirty || active) && <label className={s.label}>{label}</label>}
            <input
                {...input}
                className={s.input}
                type={type}
                placeholder={!active ? placeholder : undefined} />
            {touched && (error && <p>{error}</p>)}
        </div>
    )
}

const renderInputMask = ({
    input,
    label,
    placeholder,
    type,
    value,
    mask,
    meta: {
        touched,
        error,
        active,
        dirty,
        visited } }) => {

    return (
        <div className={s.input_wrap}>
            {visited && (dirty || active) && <label className={s.label}>{label}</label>}
            <Inputmask
                {...input}
                type={type}
                placeholder={placeholder}
                value={value}
                mask={mask}
            />
            {touched && (error && <p>{error}</p>)}
        </div>
    )
}

const Form = ({
    isPreloader,
    handleSubmit,
    isDisabled,
    onSubmit }) => {

    const intl = useIntl();

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <Field
                className={s.input_wrap}
                type="text"
                name="last_name"
                component={renderInput}
                placeholder={intl.formatMessage({
                    id: "msg.last_name",
                    defaultMessage: "Имя"
                })}
                label={intl.formatMessage({
                    id: "msg.last_name",
                    defaultMessage: "Имя"
                })}
                validate={combine(required(),
                    length({ min: 2, max: 30 })
                )}
            />
            <Field
                className={s.input_wrap}
                type="text"
                name="first_name"
                component={renderInput}
                placeholder={intl.formatMessage({
                    id: "msg.first_name",
                    defaultMessage: "Фамилия"
                })}
                label={intl.formatMessage({
                    id: "msg.first_name",
                    defaultMessage: "Фамилия"
                })}
                validate={combine(required(),
                    length({ min: 2, max: 30 })
                )}
            />
            <Field
                className={s.input_wrap}
                type="text"
                name="patronymic"
                component={renderInput}
                placeholder={intl.formatMessage({
                    id: "msg.patronymic",
                    defaultMessage: "Отчество"
                })}
                label={intl.formatMessage({
                    id: "msg.patronymic",
                    defaultMessage: "Отчество"
                })}
                validate={length({ max: 30 })}
            />
            <Field
                className={s.input_wrap}
                type="email"
                name="email"
                component={renderInput}
                placeholder={"E-mail"}
                label={"E-mail"}
                validate={email()}
            />
            <Field
                className={s.input_wrap}
                type="tel"
                name="tel"
                component={renderInputMask}
                placeholder={"+__(___)___-__-__"}
                label={"Телефон"}
                validate={combine(required(), format({
                    with: new RegExp("\\+[0-9][0-9]\\s\\([0-9][0-9][0-9]\\)\\s[0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]")
                })
                )}
                mask={"+38 (099) 999-99-99"}
            />
            <button
                className={s.submit}
                type="submit"
                disabled={isDisabled}>
                {isPreloader
                    ? <Preloader size="40px" />
                    : <FormattedMessage id="msg.submit" />}
            </button>
        </form>
    )
}

export default Form;
