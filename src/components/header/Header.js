import React from 'react'
import s from './Header.module.css'
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
import Language from '../language/Language'
import { localeAC } from '../../redux/locale_reducer'
import { FormattedMessage } from 'react-intl'
import Breadcrumbs from '../breadcrumbs/Breadcrumbs'

const Header = ({
    isMenu,
    active,
    choosed,
    isLoadingCard,
    basket,
    scrollToTop,
    isValidToken,
    setFormName,
    setLanguage,
    first_name,
    last_name
}) => {

    return (
        <header>
            <div className={s.top_block}>
                <Link onClick={setFormName} className={s.user_link} to={isValidToken ? "/userroom" : "/login"}>
                    <UserIcon className={`${s.user_icon} ${isValidToken && s.user_icon_active}`} />
                    <span>{isValidToken
                        ? `${first_name} ${last_name}`
                        : <FormattedMessage
                            id="login.sign_in"
                            defaultMessage="Sign_in" />}
                    </span>
                </Link>
                <Language className={s.language} setLanguage={setLanguage} />
            </div>
            <div className={s.header}>
                <Link className={s.logo} to='/'>
                    <img src={logo} alt="logotype" />
                </Link>
                <svg className={s.btn_on} onClick={() => isMenu(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
                </svg>
                <Search />
                <Link onClick={basket} className={s.basket_link} to={choosed > 0 ? '/purchases' : '/order'}>
                    <Basket
                        choosed={choosed}
                        isLoadingCard={isLoadingCard}
                        className={s.spiner} />
                </Link>
            </div>
            <nav onTouchMove={() => isMenu(false)} className={`${s.menu} ${active ? s.menu_active : null}`}>
                <svg className={s.btn_off} onClick={() => isMenu(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                    <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
                </svg>
                <Language className={`${s.language} ${s.display}`} setLanguage={setLanguage} />
                <ul onClick={() => setTimeout(() => isMenu(false), 400)}>
                    <li className={s.menu_user_link}>
                        <Link onClick={setFormName} className={s.user_link} to={isValidToken ? "/userroom" : "/login"}>
                            <UserIcon className={`${s.user_icon} ${isValidToken ? s.user_icon_active : ''}`} />
                            {isValidToken ? <span>{`${first_name} ${last_name}`}</span> : <span><FormattedMessage id="login.sign_in" defaultMessage="Sign_in" /></span>}
                        </Link>
                    </li>
                    <li><NavLink activeClassName={s.active} exact to="/">
                        <FormattedMessage
                            id="menu.home"
                            defaultMessage="home" />
                    </NavLink></li>
                    <li><NavLink activeClassName={s.active} to="/shop">
                        <FormattedMessage
                            id="menu.shop"
                            defaultMessage="shop" />
                    </NavLink></li>
                    <li><NavLink activeClassName={s.active} onClick={scrollToTop} to="/service">
                        <FormattedMessage
                            id="menu.service"
                            defaultMessage="service" />
                    </NavLink></li>
                    <li><NavLink activeClassName={s.active} onClick={scrollToTop} to="/contacts">
                        <FormattedMessage
                            id="menu.contacts"
                            defaultMessage="contacts" />
                    </NavLink></li>
                    <li><NavLink activeClassName={s.active} to="/consult">
                        <FormattedMessage
                            id="menu.consult"
                            defaultMessage="consult" />
                    </NavLink></li>
                </ul>
            </nav>
            <Breadcrumbs />
        </header>
    )
}

const mapStateToProps = state => {
    return {
        isLoadingCard: state.cards.isLoadingCard,
        active: state.menuActive.active,
        choosed: state.cards.purchase.length,
        isValidToken: state.userRoom.isValidToken,
        first_name: state.userRoom.userData.first_name,
        last_name: state.userRoom.userData.last_name
    }
}

const mapDispatchToProps = dispatch => {

    return {
        isVisible: () => dispatch(consultAC(true)),
        isMenu: bool => dispatch(menuActiveAC(bool)),
        basket: () => dispatch(getTotalCostAC()),
        setFormName: () => {
            dispatch(setSubmitNameAC('login.sign_in'))
            dispatch(setModalNameAC('login'))
        },
        setLanguage: locale => dispatch(localeAC(locale))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)