import React from 'react'
import s from './Login.module.css'
import { connect } from 'react-redux'
import { formThunk, setModalNameAC, isCheckedAC, setSubmitNameAC } from '../../redux/user_room_reducer'
import { FormattedMessage } from 'react-intl'
import { Redirect } from 'react-router-dom'
import Preloader from '../../common/Preloader'
import { reduxForm } from 'redux-form'
import '../../messages/translate'
import InputFirstName from '../form/InputFirstName'
import InputEmail from '../form/InputEmail'
import InputPassword from '../form/InputPassword'

const Login = ({
    onsubmit,
    modal_name,
    submit_name,
    isDisabled,
    setModalName,
    setSubmitName,
    handleSubmit,
    isValidToken,
    setChecked,
    isChecked }) => {

    const handleClick = () => {

        if (modal_name === "login") {

            setSubmitName('login.sign_up')
            setModalName('register')
        } else if (modal_name === 'register') {

            setSubmitName('login.sign_in')
            setModalName('login')
        }
    }
    let submitName = "login.sign_in"

    submitName = submit_name

    return (
        isValidToken && modal_name !== "edit_user_data" ? <Redirect to="/userroom" /> : <div className={s.container}>
            <div className={s.wrapper_form}>
                <form className={s.form} onSubmit={handleSubmit(onsubmit)}>
                    {modal_name === "register" ? <InputFirstName isLabel={true} style={s.input_wrap} /> : null}
                    <InputEmail isLabel={true} style={s.input_wrap} />
                    {modal_name !== "forget" ? <InputPassword isLabel={true} style={s.input_wrap} /> : null}
                    <div className={`${s.checkbox} ${isChecked ? s.checkbox_active : ''}`}>
                        {modal_name === 'login'
                            ? <label>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
                                    </svg>
                                </div>
                                <input type="checkbox"
                                    name="checkbox"
                                    checked={isChecked}
                                    onChange={() => setChecked(!isChecked)} />
                                    <FormattedMessage
                                        id={"login.remember"}
                                        defaultMessage="remember me" />
                                </label> 
                            : null}
                        {modal_name !== "register" ? <button className={s.forget} onClick={() => {
                            setSubmitName(modal_name !== "forget" ? 'login.reset' : "login.sign_in" )
                            setModalName(modal_name !== "forget" ? "forget" : "login")
                        }} type="button">
                            {modal_name !== "forget" 
                                ? <FormattedMessage
                                    id={"login.remind"}
                                    defaultMessage="Remind password" /> 
                                : <FormattedMessage
                                    id={"login.remembered"}
                                    defaultMessage="I remembered!" />}
                        </button> : null}
                    </div>
                    <button
                        className={s.submit}
                        type="submit"
                        disabled={isDisabled}>
                        {isDisabled
                            ? <Preloader size="40px" />
                            : <FormattedMessage
                                id={submitName}
                                defaultMessage="submite" />}
                    </button>
                </form>
                {modal_name !== "forget" ? <button onClick={handleClick}>
                    <FormattedMessage
                        id={submit_name === "login.sign_in" ? "login.sign_up" : "login.sign_in"}
                        defaultMessage="submite" />
                </button> : null}
            </div>
        </div>
    )
}

const OrderReduxForm = reduxForm({
    form: 'order',
    enableReinitialize: true
})(Login)

const mapStateToProps = state => {

    return {
        isDisabled: state.shopping.isDisabled,
        modal_name: state.userRoom.modal_name,
        tel: state.userRoom.userData.tel,
        isValidToken: state.userRoom.isValidToken,
        isChecked: state.userRoom.isChecked,
        submit_name: state.userRoom.submit_name
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onsubmit: values => dispatch(formThunk(values)),
        setChecked: checked => dispatch(isCheckedAC(checked)),
        setModalName: modal_name => dispatch(setModalNameAC(modal_name)),
        setSubmitName: submit_name => dispatch(setSubmitNameAC(submit_name))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderReduxForm)