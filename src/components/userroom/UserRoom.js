import React from 'react'
import { Link } from 'react-router-dom'
import s from './UserRoom.module.css'
import { connect } from 'react-redux'
import { exitThunk } from '../../redux/user_room_reducer'


const UserRoom = ({
    isValidToken,
    userData,
    exit }) => {

    return (
        <div className={s.container}>
            <ul className={s.user_menu}>
                <li><Link to="/personal">{userData.first_name ? `${userData.first_name} ${userData.last_name}`: "Личная информация"}</Link></li>
                <li><Link to="/purchases">Корзина</Link></li>
                <li>Мои заказы</li>
                <li>Сравнения</li>
                <li>Список желаний</li>
                <li onClick={isValidToken ? exit : null}><Link to={!isValidToken ? "/login" : "/userroom" }>{isValidToken  ? "Выйти" : "Войти"}</Link></li>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRoom)