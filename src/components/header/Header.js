import React from 'react'
import s from './Header.module.css'
import MenuButton from './MenuButton.js'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { consultAC } from '../../redux/consult_reduser'
import { menuActiveAC } from '../../redux/menu_reducer'
import Basket from './Basket'
import { getTotalCostAC } from '../../redux/cards_reduser'
import Search from './Search'
import UserIcon from './UserIcon'
import logo from '../../img/logo.svg'

const Header = props => {
    
    return (
        <header>
            <div className={s.header}>
                <Link className={s.logo} to='/'>
                    <img src={logo} alt="logotype"/>
                </Link>
                <Search /> 
                <MenuButton menuClick={props.menuClick} active={props.active} /> 
                <Link className={s.basket_link}  to={props.choosed > 0 ? "/purchases" : "/"}>
                    <Basket 
                        choosed={props.choosed} 
                        isLoadingCard={props.isLoadingCard}
                        className={s.spiner}/>
                </Link>
                <Link className={s.user_link} to={"/register"}>
                    <UserIcon isLogin={props.isLogin}/>
                    <span>{props.isLogin ? "Logout" : "Login"}</span>
                </Link>
            </div>
            <nav onClick={props.isMenu} className={`${s.menu} ${props.active ? s.menu_active : null}`}>
                <ul>
                    <li className={s.user_link_menu}>
                        <NavLink activeClassName={s.active} to={"/register"}>{props.isLogin ? "Logout" : "Login"}</NavLink>
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
        isLogin: state.login.isLogin
    }
}

const mapDispatchToProps = dispatch => {

    return {
        isVisible: () => dispatch(consultAC(true)),
        menuClick: () => dispatch(menuActiveAC()),
        isMenu: () => setTimeout(() => {
            dispatch(menuActiveAC())
        }, 400),
        basket: () => dispatch(getTotalCostAC())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)