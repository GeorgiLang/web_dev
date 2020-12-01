import React from 'react'
import Form from '../form/Form'
import s from './Login.module.css'
import { connect } from 'react-redux'
import { formThunk, setModalNameAC, setSubmitNameAC } from '../../redux/user_room_reducer'
import { FormattedMessage } from 'react-intl'
import { Redirect } from 'react-router-dom'

const Login = ({
    isPreloader,
    onsubmit,
    modal_name,
    submit_name,
    isDisabled,
    setModalName,
    setSubmitName,
    tel,
    isValidToken }) => {

    const handleClick = () => {

        if (modal_name === "login") {

            setSubmitName('login.sign_up')
            setModalName('register')
        } else if (modal_name === 'register') {

            setSubmitName('login.sign_in')
            setModalName('login')
        }
    }

    return (

        isValidToken ? <Redirect to="/userroom" /> : <div className={s.container}>
            <div className={s.wrapper_form}>
                <p>Вхід</p>
                <Form 
                    className={s.form}
                    isPreloader={isPreloader}
                    onSubmit={values => onsubmit(values)}
                    submit_name={submit_name}
                    modal_name={modal_name}
                    tel={tel}
                    isDisabled={isDisabled} />
                <button onClick={handleClick}>
                    <FormattedMessage 
                        id={submit_name === "login.sign_in" ? "login.sign_up" : "login.sign_in"}
                        defaultMessage="submite" />
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = state => {

    return {
        isPreloader: state.shopping.preloader,
        isDisabled: state.shopping.isDisabled,
        modal_name: state.userRoom.modal_name,
        tel: state.userRoom.userData.tel,
        isValidToken: state.userRoom.isValidToken,
        submit_name: state.userRoom.submit_name
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onsubmit: values => dispatch(formThunk(values)),
        setModalName : modal_name => dispatch(setModalNameAC(modal_name)),
        setSubmitName : submit_name => dispatch(setSubmitNameAC(submit_name))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)