import React, { useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import s from './UserRoom.module.css'
import { connect } from 'react-redux'
import { exitThunk } from '../../redux/user_room_reducer'

const UserRoom = ({

    isValidToken,
    userData,
    purchase,
    scrollToTop,
    exit }) => {

    let history = useHistory()
    const location = useLocation()
    let path = location.pathname.split('/')

    useEffect(() => {

        scrollToTop()
    }, [])

    useEffect(() => {

        if (!isValidToken && path[3] !== 'token') {

            history.push({
                pathname: "/login"
            })
        }   
    }, [isValidToken])

    return (
        <div className={s.container}>
            <ul className={s.user_menu}>
                <li><Link to="/personal">{userData.first_name ? `${userData.first_name} ${userData.last_name}`: "Личная информация"}</Link></li>
                <li><Link to="/purchases">Корзина{purchase.length === 0 ? '' : <span className={s.basket_qty}><span>{purchase.length}</span></span>}</Link></li>
                <li style={{opacity: "0.5"}}>Мои заказы</li>
                <li style={{opacity: "0.5"}}>Сравнения</li>
                <li style={{opacity: "0.5"}}>Список желаний</li>
                <li onClick={isValidToken ? exit : null}>
                    <Link to={!isValidToken ? "/login" : "/userroom" }>{isValidToken  ? "Выйти" : "Войти"}</Link>
                </li>
            </ul>
        </div>
    )
}

const mapStateToProps = state => {

    return {
        isValidToken: state.userRoom.isValidToken,
        userData: state.userRoom.userData,
        purchase: state.cards.purchase
    }
}

const mapDispatchToProps = dispatch => {

    return {
        exit: () => dispatch(exitThunk())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRoom)