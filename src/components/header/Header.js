import React from 'react'
import s from './Header.module.css'
import MenuButton from './MenuButton.js'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { consultAC } from '../../redux/consult_reducer'
import { menuActiveAC } from '../../redux/menu_reducer'
import Basket from './Basket'
import { getTotalCostAC } from '../../redux/cards_reduсer'
import Search from './Search'
import logo from '../../img/logo.svg'
import UserIcon from '../../common/UserIcon'
import { setSubmitNameAC, setModalNameAC } from '../../redux/user_room_reducer'

const Header = ({
    menuClick,
    active,
    choosed,
    isLoadingCard,
    isMenu,
    basket,
    isValidToken,
    setFormName
}) => {

    return (
        <header>
            <div className={s.header}>
                <Link className={s.logo} to='/'>
                    <img src={logo} alt="logotype" />
                </Link>
                <Search />
                <MenuButton menuClick={menuClick} active={active} />
                <Link onClick={setFormName} className={s.user_link} to={isValidToken ? "/userroom" : "/login"}>
                    <UserIcon className={`${s.user_icon} ${isValidToken ? s.user_icon_active : ''}`}/>
                </Link>
                <Link onClick={basket} className={s.basket_link} to={choosed > 0 ? "/purchases" : "/order"}>
                    <Basket
                        choosed={choosed}
                        isLoadingCard={isLoadingCard}
                        className={s.spiner} />
                </Link>
            </div>
            <nav onClick={isMenu} className={`${s.menu} ${active ? s.menu_active : null}`}>
                <ul>
                    <li className={s.menu_user_link}>
                        <Link className={s.user_link} to={isValidToken ? "/userroom" : "/login"}>
                            <UserIcon className={`${s.user_icon} ${isValidToken ? s.user_icon_active : ''}`}/>
                        </Link>
                    </li>
                    <li><NavLink activeClassName={s.active} exact to="/">Home</NavLink></li>
                    <li><NavLink activeClassName={s.active} to="/shop">Shop</NavLink></li>
                    <li><NavLink activeClassName={s.active} to="/service">Service</NavLink></li>
                    <li><NavLink activeClassName={s.active} to="/contacts">Contacts</NavLink></li>
                    <li><NavLink activeClassName={s.active} to="/consult">Consult</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

const mapStateToProps = state => {
    return {
        isLoadingCard: state.cards.isLoadingCard,
        active: state.menuActive.active,
        choosed: state.cards.purchase.length,
        isValidToken: state.userRoom.isValidToken
    }
}

const mapDispatchToProps = dispatch => {

    return {
        isVisible: () => dispatch(consultAC(true)),
        menuClick: () => dispatch(menuActiveAC()),
        isMenu: () => setTimeout(() => {
            dispatch(menuActiveAC())
        }, 400),
        basket: () => dispatch(getTotalCostAC()),
        setFormName: () => {
            dispatch(setSubmitNameAC('login.sign_in'))
            dispatch(setModalNameAC('login'))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)