import React from 'react'
import { Link } from 'react-router-dom'
import s from './Personal.module.css'
import { connect } from 'react-redux'
import { exitThunk } from '../../redux/user_room_reducer'

const Personal = ({
    isValidToken,
    userData,
    exit }) => {

    return (
        <div className={s.container}>
            <ul className={s.user_menu}>
                <li>Имя: <span>{userData.first_name}</span></li>
                <li>Фамилия: <span>{userData.last_name}</span></li>
                <li>Телефон: <span>{userData.tel}</span></li>
                <li>Email: <span>{userData.email}</span></li>
            </ul>
        </div>
    )
}

const mapStateToProps = state => {

    return {
        isValidToken: state.userRoom.isValidToken,
        userData: state.userRoom.userData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        exit: () => dispatch(exitThunk())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Personal)