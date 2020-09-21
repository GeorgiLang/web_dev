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

const Header = props => {
    
    return (
        <header>
            <div className={s.header}>
                <Link className={s.logo} to='/'>
                    <svg version="1.2" xmlns="http://www.w3.org/2000/svg"
                            x="0px" y="0px" viewBox="0 0 120 30">
                        <g>
                            <path fill="orange" d="M6.2,29.3L0.5,1.9h3.1l2.7,13.9c0.7,3.4,1.3,6.8,1.7,9.5H8c0.4-2.7,1.1-6,1.8-9.5l3-13.8h3l2.7,13.9
                                c0.6,3.3,1.2,6.5,1.6,9.4h0.1c0.5-3,1.1-6.1,1.8-9.5l3-13.8h3l-6.4,27.4h-3l-2.8-14.3c-0.7-3.5-1.2-6.2-1.5-8.9h-0.1
                                c-0.4,2.7-0.9,5.4-1.7,8.9L9.3,29.3H6.2z"/>
                            <path fill="orange" d="M31.2,20.2c0.1,4.8,2.6,6.8,5.5,6.8c2.1,0,3.4-0.4,4.5-1l0.5,2.6c-1,0.6-2.8,1.2-5.4,1.2c-5,0-7.9-4-7.9-9.9
                                c0-5.9,2.9-10.6,7.6-10.6c5.3,0,6.7,5.7,6.7,9.3c0,0.7-0.1,1.3-0.1,1.7H31.2z M39.8,17.6c0-2.3-0.8-5.8-4.1-5.8
                                c-3,0-4.3,3.3-4.5,5.8H39.8z"/>
                            <path fill="orange" d="M46.2,29.3c0.1-1.3,0.1-3.3,0.1-5.1V0.5h2.9v12.4h0.1c1-2.2,2.9-3.6,5.5-3.6c4,0,6.8,4.1,6.8,10c0,7-3.6,10.5-7.2,10.5
                                c-2.3,0-4.2-1.1-5.4-3.7h-0.1l-0.1,3.3H46.2z M49.2,21.5c0,0.4,0.1,0.9,0.1,1.3c0.6,2.5,2.3,4.2,4.4,4.2c3.1,0,4.9-3,4.9-7.6
                                c0-3.9-1.7-7.3-4.8-7.3c-2,0-3.9,1.7-4.5,4.4c-0.1,0.4-0.2,0.9-0.2,1.5V21.5z"/>
                            <path fill="grey" d="M65.4,2.3C66.8,2,68.7,1.7,71,1.7c2.9,0,5,0.8,6.3,2.3c1.2,1.3,2,3.3,2,5.7c0,2.5-0.6,4.4-1.7,5.9c-1.5,2-4,3-6.9,3
                                c-0.9,0-1.7,0-2.3-0.2v11h-2.9V2.3z M68.3,15.5c0.6,0.2,1.4,0.3,2.4,0.3c3.5,0,5.6-2.1,5.6-5.9c0-3.6-2.1-5.4-5.3-5.4
                                c-1.3,0-2.2,0.1-2.7,0.3V15.5z"/>
                            <path fill="grey" d="M82.9,0.5h2.9v28.9h-2.9V0.5z"/>
                            <path fill="grey" d="M104.3,24c0,2,0,3.8,0.1,5.4h-2.6l-0.2-3.2h-0.1c-0.8,1.6-2.5,3.7-5.3,3.7c-2.5,0-5.6-1.7-5.6-8.6V9.7h2.9v10.9
                                c0,3.7,0.9,6.3,3.6,6.3c2,0,3.3-1.7,3.9-3.3c0.2-0.5,0.3-1.2,0.3-1.8V9.7h2.9V24z"/>
                            <path fill="grey" d="M108.8,25.7c0.9,0.7,2.4,1.4,3.9,1.4c2.1,0,3.1-1.3,3.1-2.9c0-1.7-0.8-2.6-3-3.6c-2.9-1.3-4.3-3.2-4.3-5.6
                                c0-3.2,2.1-5.8,5.6-5.8c1.6,0,3.1,0.6,4,1.2l-0.7,2.6c-0.6-0.5-1.8-1.1-3.3-1.1c-1.7,0-2.7,1.2-2.7,2.7c0,1.6,1,2.4,3.1,3.3
                                c2.8,1.3,4.2,3,4.2,5.9c0,3.5-2.2,5.9-6,5.9c-1.8,0-3.4-0.5-4.5-1.3L108.8,25.7z"/>
                        </g>
                    </svg>
                </Link>
                <Search /> 
                <MenuButton menuClick={props.menuClick} active={props.active} /> 
                <Link className={s.basket_link}  to={props.choosed > 0 && "/purchases"}>
                    <Basket 
                        choosed={props.choosed} 
                        isLoadingCard={props.isLoadingCard}
                        className={s.spiner} 
                        basket={props.basket}/>
                </Link>
            </div>
            <nav onClick={props.isMenu} className={`${s.menu} ${props.active ? s.menu_active : null}`}>
                <ul>
                    <li><NavLink activeClassName={s.active} exact to="/">Home</NavLink></li>
                    <li><NavLink activeClassName={s.active} to="/shop">Shop</NavLink></li>
                    <li><NavLink activeClassName={s.active} to="/service">Service</NavLink></li>
                    <li><NavLink activeClassName={s.active} to="/contacts">Contacts</NavLink></li>
                    <li><NavLink activeClassName={s.active} to='/consult'>Consult</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

const mapStateToProps = state => {
    return {
        isLoadingCard: state.cards.isLoadingCard,
        active: state.menuActive.active,
        choosed: state.cards.purchase.length
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