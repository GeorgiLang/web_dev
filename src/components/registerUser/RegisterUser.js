import React, { useState } from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import s from './registerUser.module.css'
import { combine, required, length } from 'redux-form-validators'
import {
    registerUserThunk,
    isLoginAC,
    loginFormThunk
} from '../../redux/login_reduser'

const renderInput = ({
    input,
    label,
    type,
    meta: {
        touched,
        error } }) => {

    return (
        <div className={s.input_wrap}>
            <div className={s.label_wrap}>
                <label className={s.label}>{label}</label>
                {touched && (error && <span className={s.hint}>{error}</span>)}
            </div>
            <input type={type} className={s.input} {...input} />
        </div>
    )
}

const renderCheckbox = ({
    input,
    type,
    isPasswordInputVisible,
    loginForm

}) => {
    return (
        <div className={s.checkbox}>
            <input className={s.checkbox_input} type={type} id="remember"  {...input}/>
            {isPasswordInputVisible ? <label className={s.remember} htmlFor="remember">Запам'ятати мене</label> : null}
            <span onClick={() => loginForm('forget_password')}>{isPasswordInputVisible ? "Нагадати пароль" : "Я пам'ятаю пароль!"}</span>
        </div>
    )
}

const renderInputPassword = ({
    input,
    label,
    type,
    isVisiblePassword,
    visiblePassword,
    meta: {
        touched,
        error } }) => {

    return (
        <div className={s.input_wrap}>
            <div className={s.label_wrap}>
                <label className={s.label}>{label}</label>
                {touched && (error && <span className={s.hint}>{error}</span>)}
            </div>
            <div className={s.input_password}>
                <input type={type} autoComplete="current-password" className={s.input} {...input} />
                {isVisiblePassword ? <svg onClick={visiblePassword} className={s.eye} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M569.354 231.631C512.969 135.949 407.81 72 288 72 168.14 72 63.004 135.994 6.646 231.631a47.999 47.999 0 0 0 0 48.739C63.031 376.051 168.19 440 288 440c119.86 0 224.996-63.994 281.354-159.631a47.997 47.997 0 0 0 0-48.738zM288 392c-75.162 0-136-60.827-136-136 0-75.162 60.826-136 136-136 75.162 0 136 60.826 136 136 0 75.162-60.826 136-136 136zm104-136c0 57.438-46.562 104-104 104s-104-46.562-104-104c0-17.708 4.431-34.379 12.236-48.973l-.001.032c0 23.651 19.173 42.823 42.824 42.823s42.824-19.173 42.824-42.823c0-23.651-19.173-42.824-42.824-42.824l-.032.001C253.621 156.431 270.292 152 288 152c57.438 0 104 46.562 104 104z" /></svg>
                    : <svg onClick={visiblePassword} className={s.eye} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M286.693 391.984l32.579 46.542A333.958 333.958 0 0 1 288 440C168.19 440 63.031 376.051 6.646 280.369a47.999 47.999 0 0 1 0-48.739c24.023-40.766 56.913-75.775 96.024-102.537l57.077 81.539C154.736 224.82 152 240.087 152 256c0 74.736 60.135 135.282 134.693 135.984zm282.661-111.615c-31.667 53.737-78.747 97.46-135.175 125.475l.011.015 41.47 59.2c7.6 10.86 4.96 25.82-5.9 33.42l-13.11 9.18c-10.86 7.6-25.82 4.96-33.42-5.9L100.34 46.94c-7.6-10.86-4.96-25.82 5.9-33.42l13.11-9.18c10.86-7.6 25.82-4.96 33.42 5.9l51.038 72.617C230.68 75.776 258.905 72 288 72c119.81 0 224.969 63.949 281.354 159.631a48.002 48.002 0 0 1 0 48.738zM424 256c0-75.174-60.838-136-136-136-17.939 0-35.056 3.473-50.729 9.772l19.299 27.058c25.869-8.171 55.044-6.163 80.4 7.41h-.03c-23.65 0-42.82 19.17-42.82 42.82 0 23.626 19.147 42.82 42.82 42.82 23.65 0 42.82-19.17 42.82-42.82v-.03c18.462 34.49 16.312 77.914-8.25 110.95v.01l19.314 27.061C411.496 321.2 424 290.074 424 256zM262.014 356.727l-77.53-110.757c-5.014 52.387 29.314 98.354 77.53 110.757z" /></svg>}

            </div>
        </div>
    )
}

const Register = ({
    isEmailInputVisible,
    isPasswordInputVisible,
    isUsernameInputVisible,
    isRegistered,
    loginForm,
    isAuth,
    handleSubmit,
    isDisabled,
    onsubmit }) => {

    const [isVisiblePassword, setVisiblePassword] = useState(false)

    const visiblePassword = () => {
        isVisiblePassword ? setVisiblePassword(false) : setVisiblePassword(true)
    }
    console.log(isEmailInputVisible)
    return (
        <form className={s.register_form} onSubmit={handleSubmit(onsubmit)}>
            {isUsernameInputVisible ? <Field
                className={s.input}
                type="text"
                name="username"
                component={renderInput}
                label={isEmailInputVisible ? "Ім'я" : "Ім'я або E-mail адреса"}
                autoComplete="on"
                validate={combine(required(),
                    length({ min: 2, max: 30 })
                )}
            /> : null}
            {isEmailInputVisible ? <Field
                className={s.input}
                type="email"
                name="email"
                component={renderInput}
                label="E-mail адреса"
                autoComplete="on"
                validate={combine(required(),
                    length({ min: 2, max: 30 })
                )}
            /> : null}
            {isPasswordInputVisible ? <Field
                className={s.input}
                type={isVisiblePassword ? "text" : "password"}
                name="password"
                isVisiblePassword={isVisiblePassword}
                visiblePassword={visiblePassword}
                component={renderInputPassword}
                label="Пароль"
                validate={combine(required(),
                    length({ min: 8, max: 30 })
                )}
            /> : null}
            {isRegistered ? <Field
                type="checkbox"
                name="remember"
                isPasswordInputVisible={isPasswordInputVisible}
                loginForm={loginForm}
                component={renderCheckbox} /> : null}
            <button className={s.submit}
                type="submit"
                disabled={isDisabled}>
                {isRegistered ? (isPasswordInputVisible ? "Увійти" : "Отримати новий пароль") : "Зареєструватися"}
            </button>
        </form>
    )
}

const RegisterUserReduxForm = reduxForm({
    form: 'registerUser'
})(Register)

const RegisterUser = props => {

    return (
        <div className={s.register_container}>
            <p>Вхід</p>
            <RegisterUserReduxForm
                loginForm={props.loginForm}
                isRegistered={props.isRegistered}
                {...props} />
            {props.isPasswordInputVisible 
                ? <p onClick={() => props.loginForm('registered')}>{props.isRegistered ? "Зареєструватися" : "Я вже зареєстрований"}</p> 
                : null}
        </div>
    )
}

const mapStateToProps = state => {

    return {
        isDisabled: state.login.isDisabled,
        isLogin: state.login.isLogin,
        isForget: state.login.isForget,
        isEmailInputVisible: state.login.isEmailInputVisible,
        isPasswordInputVisible: state.login.isPasswordInputVisible,
        isUsernameInputVisible: state.login.isUsernameInputVisible,
        isRegistered: state.login.isRegistered,
        isAuth: state.login.isAuth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onsubmit: values => dispatch(registerUserThunk(values)),
        onLogin: () => dispatch(isLoginAC()),
        loginForm: action => dispatch(loginFormThunk(action))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser)