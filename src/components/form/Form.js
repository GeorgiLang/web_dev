import React from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { combine, required, length, format, email } from 'redux-form-validators'
import { FormattedMessage, useIntl } from 'react-intl'
import Preloader from '../../common/Preloader'
import Inputmask from 'react-input-mask'
import s from './Form.module.css'
import { reduxForm } from 'redux-form'

const input = ({
    input,
    label,
    placeholder,
    autoComplete,
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
                autoComplete={autoComplete}
                type={type}
                placeholder={!active ? placeholder : undefined} />
            {touched && (error && <p>{error}</p>)}
        </div>
    )
}

const inputMask = ({
    input,
    label,
    placeholder,
    type,
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
                mask={mask}
            />
            {touched && (error && <p>{error}</p>)}
        </div>
    )
}

const renderCheckbox = ({
    input,
    type }) => {

    return (
        <div className={`${s.checkbox} ${input.checked ? s.checkbox_active : ''}`}>
            <label>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" /></svg>
                </div>
                <input
                    {...input}
                    type={type} />
                Запам'ятати мене</label>
        </div>
    )
}

let Form = ({
    isPreloader,
    handleSubmit,
    isDisabled,
    onSubmit,
    tel,
    modal_name,
    submit_name }) => {

    const intl = useIntl()
    let submitName = "login.sign_in"

    submitName = submit_name

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            {modal_name !== "login" ? <Field
                type="text"
                name="first_name"
                autoComplete="username"
                component={input}
                placeholder={intl.formatMessage({
                    id: "login.first_name",
                    defaultMessage: "Имя"
                })}
                label={intl.formatMessage({
                    id: "login.first_name",
                    defaultMessage: "Имя"
                })}
                validate={combine(required(),
                    length({ min: 2, max: 20 }),
                    format({
                        with: /^[А-ЯІЇЄ*-]+$/i,
                        message: intl.formatMessage({
                            id: "login.only_cyrillic",
                            defaultMessage: "Введите ваши данные кирилицей"
                        })
                    })
                )}
            /> : null}
            {modal_name === ("send_order" || "full_register") ? <Field
                type="text"
                name="last_name"
                autoComplete="lastname"
                component={input}
                placeholder={intl.formatMessage({
                    id: "login.last_name",
                    defaultMessage: "Фамилия"
                })}
                label={intl.formatMessage({
                    id: "login.last_name",
                    defaultMessage: "Фамилия"
                })}
                validate={combine(required(),
                    length({ min: 2, max: 20 }),
                    format({
                        with: /^[А-ЯІЇЄ*-]+$/i,
                        message: intl.formatMessage({
                            id: "login.only_cyrillic",
                            defaultMessage: "Введите ваши данные кирилицей"
                        })
                    })
                )}
            /> : null}
            <Field
                type="email"
                name="email"
                autoComplete="email"
                component={input}
                placeholder={"E-mail"}
                label={"E-mail"}
                validate={email()}
            />
            {modal_name === ("send_order" || "full_register") ? <Field
                type="tel"
                name="tel"
                component={inputMask}
                placeholder={"+__(___)___-__-__"}
                label={intl.formatMessage({
                    id: "login.phone",
                    defaultMessage: "Телефон"
                })}
                validate={combine(required(), format({
                    with: new RegExp("\\+[0-9][0-9]\\s\\([0-9][0-9][0-9]\\)\\s[0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]")
                })
                )}
                tel={tel}
                mask={"+38 (099) 999-99-99"}
            /> : null}
            {modal_name !== "send_order" ? <Field
                type="password"
                name="password"
                autoComplete="current-password"
                component={input}
                placeholder={"Password"}
                label={"Password"}
                validate={length({ min: 6, max: 20 })}
            /> : null}
            {modal_name === 'login' ? <Field
                type="checkbox"
                name="checkbox"
                component={renderCheckbox}
            /> : null}
            <button
                className={s.submit}
                type="submit"
                disabled={isDisabled}>
                {isPreloader
                    ? <Preloader size="40px" />
                    : <FormattedMessage
                        id={submitName}
                        defaultMessage="submite" />}
            </button>
        </form>
    )
}

const OrderReduxForm = reduxForm({
    form: 'order',
    enableReinitialize: true
})(Form)

const mapStateToProps = state => ({

    initialValues: state.userRoom.userData
})

export default connect(mapStateToProps)(OrderReduxForm)