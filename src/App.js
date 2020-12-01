import React, { useEffect } from 'react'
import './index.css'
import Header from './components/header/Header'
import { connect } from 'react-redux'
import { Route, Switch, useLocation } from 'react-router-dom'
import CardContainer from './components/card/CardContainer'
import FullCardContainer from './components/fullcard/FullCardContainer'
import Purchases from './components/purchases/Purchases'
import Categories from './components/categories/Categories'
import LinePreloader from './common/LinePreloader'
import I18Provider from './messages/provider'
import logoReact from './img/logo512.png'
import logoWP from './img/WP-logotype.png'
import { screenWidthAC } from './redux/cards_reduсer'
import { tokenListenerThunk, isPopupAC } from './redux/user_room_reducer'
import Login from './components/login/Login'
import PopupMessage from './components/popup_message/PopupMessage'
import UserRoom from './components/userroom/UserRoom'
import Personal from './components/personal/Personal'

const OrderForm = React.lazy(() => import('./components/order/Order'))
const Popup = React.lazy(() => import('./components/popup/Popup'))

const App = ({
    locale,
    linePreloader,
    setScreenWidth,
    tokenListener,
    popup_message,
    isPopup,
    deletePopup,
    getUserData }) => {
    
    let location = useLocation()
    useEffect(() => {

        let path = location.pathname.split('/')

        setScreenWidth()
        tokenListener(path)

    }, [setScreenWidth, tokenListener, getUserData])

    return (
        <I18Provider locale={locale}>
            {linePreloader ? <LinePreloader /> : null}
            <Header />
            <div className="container">
                <Switch>
                    <Route exact path='/'>
                        <div className="yellow page">
                            <div className="logos">
                                <div><img src={logoReact} alt="Logo React" /></div>
                                <div><img src={logoWP} alt="Logo Wordpress" /></div>
                            </div>
                        </div>
                    </Route>
                    <Route path='/shop/:category/:models'><CardContainer /></Route>
                    <Route path='/purchases'><Purchases /></Route>
                    <Route path='/shop'><Categories /></Route>
                    <Route path='/service'><div className="blue page">Service</div></Route>
                    <Route path='/price'><div className="pink page">Price</div></Route>
                    <Route path='/contacts'><div className="green page">Contacts</div></Route>
                    <Route path='/userroom'><UserRoom /></Route>
                    <Route path='/order'>
                        <React.Suspense fallback={<LinePreloader />}>
                            <OrderForm />
                        </React.Suspense>
                    </Route>
                    <Route path='/fullcard/:category/:id/:id'><FullCardContainer /></Route>
                    <Route path='/consult'>
                        <React.Suspense fallback={<LinePreloader />}>
                            <Popup />
                        </React.Suspense>
                    </Route>               
                    <Route path='/login'><Login /></Route>
                    <Route path='/personal'><Personal /></Route>
                </Switch> 
                {isPopup ? <PopupMessage popup_message={popup_message} deletePopup={deletePopup}/> : null}
            </div>
        </I18Provider>
    )
}

const mapStateToProps = state => {
    return {
        locale: state.locale.locale,
        popup: state.consult.isVisible,
        categories: state.cards.categories,
        linePreloader: state.preloader.linePreloader,
        popup_message: state.userRoom.popup_message,
        isPopup: state.userRoom.isPopup
    }
}

const mapDispatchToProps = dispatch => {

    return {
        setScreenWidth: () => dispatch(screenWidthAC(window.innerWidth)),
        tokenListener: path => dispatch(tokenListenerThunk(path)),
        deletePopup: () => dispatch(isPopupAC(false))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
