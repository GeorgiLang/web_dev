import React from 'react'
import s from './Personal.module.css'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { editButtonAC, editFormThunk, editDisabledAC } from '../../redux/user_room_reducer'
import InputFirstName from '../form/InputFirstName'
import InputLastName from '../form/InputLastName'
import InputTel from '../form/InputTel'
import InputEmail from '../form/InputEmail'
import InputSecondName from '../form/InputSecondName'
import Preloader from '../../common/Preloader'
import { FormattedMessage } from 'react-intl'

const Personal = ({
    userData,
    handleSubmit,
    editForm,
    editDisabled,
    isEditButton,
    editButton }) => {

    return (
        <form className={s.form} onSubmit={handleSubmit(editForm)}>

            <div className={s.edit}
                onClick={() => { editButton(!isEditButton) }}>
                {!isEditButton
                    ? <svg className={s.edit_icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
                    </svg>
                    : <svg className={s.delete_icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                        <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
                    </svg>}
            </div>
            <div className={s.personal_box}>
                <div className={s.wrap}>
                    <span><FormattedMessage id="login.first_name" defaultMessage="First_name"/>:</span>
                    {isEditButton ? <InputFirstName isLabel={false} style={s.input_wrap} />
                        : <span>{userData.first_name}</span>}
                </div>
                <div className={s.wrap}>
                    <span><FormattedMessage id="login.last_name" defaultMessage="Last_name"/>:</span>
                    {isEditButton ? <InputLastName isLabel={false} style={s.input_wrap} />
                        : <span>{userData.last_name}</span>}
                </div>
                <div className={s.wrap}>
                    <span><FormattedMessage id="login.second_name" defaultMessage="Second_name"/>:</span>
                    {isEditButton ? <InputSecondName isLabel={false} style={s.input_wrap} />
                        : <span>{userData.second_name}</span>}
                </div>
                <div className={s.wrap}>
                    <span><FormattedMessage id="login.phone" defaultMessage="Phone number"/>:</span>
                    {isEditButton ? <InputTel isLabel={false} style={s.input_wrap} />
                        : <span>{userData.tel}</span>}
                </div>
                <div className={s.wrap}>
                    <span><FormattedMessage id="login.email" defaultMessage="E-mail"/>:</span>
                    {isEditButton ? <InputEmail isLabel={false} style={s.input_wrap} />
                        : <span>{userData.email}</span>}
                </div>
            </div>
            {isEditButton ? <button className={s.confirm} disabled={editDisabled} type="submit">
                {editDisabled
                    ? <Preloader  className={s.preloader} size="40px" /> : "Сохранить изменения"}
                </button> : null}
        </form>
    )
}

const OrderReduxForm = reduxForm({
    form: 'edit',
    enableReinitialize: true
})(Personal)

const mapStateToProps = state => {

    return {
        initialValues: state.userRoom.userData,
        userData: state.userRoom.userData,
        editDisabled: state.userRoom.editDisabled,
        isValidToken: state.userRoom.isValidToken,
        isEditButton: state.userRoom.editButton
    }
}

const mapDispatchToProps = dispatch => {

    return {
        editButton: isEditButton => {
            dispatch(editDisabledAC(false))
            dispatch(editButtonAC(isEditButton))},
        editForm: values => dispatch(editFormThunk(values))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderReduxForm)