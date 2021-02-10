import React, { useEffect } from 'react'
import s from './Login.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { formThunk, setModalNameAC, isCheckedAC, setSubmitNameAC } from '../../redux/user_room_reducer'
import { FormattedMessage } from 'react-intl'
import { useHistory } from 'react-router-dom'
import Preloader from '../../common/Preloader'
import { reduxForm } from 'redux-form'
import '../../messages/translate'
import InputFirstName from '../form/InputFirstName'
import InputEmail from '../form/InputEmail'
import InputPassword from '../form/InputPassword'

const Login = ({ handleSubmit }) => {

    let history = useHistory()
    const dispatch = useDispatch()

    const isDisabled = useSelector(state => state.shopping.isDisabled)
    const isValidToken = useSelector(state => state.userRoom.isValidToken)
    const isChecked = useSelector(state => state.userRoom.isChecked)
    const submit_name = useSelector(state => state.userRoom.submit_name)
    const modal_name = useSelector(state => state.userRoom.modal_name)

    const handleClick = () => {

        if (modal_name === "login") {

            dispatch(setSubmitNameAC('login.sign_up'))
            dispatch(setModalNameAC('register'))
        } else if (modal_name === 'register') {

            dispatch(setSubmitNameAC('login.sign_in'))
            dispatch(setModalNameAC('login'))
        }
    }
    let submitName = "login.sign_in"

    useEffect(() => {

        if (isValidToken) {
            history.goBack()
        }
    }, [isValidToken])

    submitName = submit_name

    return (
        <div className={s.container}>
            <div className={s.wrapper_form}>
                <form className={s.form} onSubmit={handleSubmit(values => dispatch(formThunk(values)))}>
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
                                    onChange={() => dispatch(isCheckedAC(!isChecked))} />
                                <FormattedMessage
                                    id={"login.remember"}
                                    defaultMessage="remember me" />
                            </label>
                            : null}
                        {modal_name !== "register" ? <button className={s.forget} onClick={() => {
                            dispatch(setSubmitNameAC(modal_name !== "forget" ? 'login.reset' : "login.sign_in"))
                            dispatch(setModalNameAC(modal_name !== "forget" ? "forget" : "login"))
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


export default OrderReduxForm