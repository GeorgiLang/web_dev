import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import Header from './components/header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useLocation } from 'react-router-dom'
import Shop from './components/shop/Shop'
import FullCardContainer from './components/fullcard/FullCardContainer'
import Purchases from './components/purchases/Purchases'
import LinePreloader from './common/LinePreloader'
import { IntlProvider } from 'react-intl'
import logoReact from './img/logo512.png'
import logoWP from './img/WP-logotype.png'
import { tokenListenerThunk, isPopupAC } from './redux/user_room_reducer'
import Login from './components/login/Login'
import PopupMessage from './components/popup_message/PopupMessage'
import UserRoom from './components/userroom/UserRoom'
import Personal from './components/personal/Personal'
import messages from './messages/index'
import ScrollToTop from './common/ScrollToTop'
import { linePreloaderAC } from './redux/preloader_reducer'
import smoothscroll from 'smoothscroll-polyfill'

// kick off the polyfill!
smoothscroll.polyfill()
const OrderForm = React.lazy(() => import('./components/order/Order'))
const Popup = React.lazy(() => import('./components/popup/Popup'))

const Home = ({scrollToTop}) => {

    const dispatch = useDispatch()

    useEffect(() => {

        scrollToTop()
        dispatch(linePreloaderAC(false))
    }, [])

    return (
        <div className="yellow page">
            <div className="logos">
                <div><img src={logoReact} alt="Logo React" /></div>
                <div><img src={logoWP} alt="Logo Wordpress" /></div>
            </div>
        </div>
    )
}

const App = () => {

    const locale = useSelector(state => state.locale.locale)
    const linePreloader = useSelector(state => state.preloader.linePreloader)
    const popup_message = useSelector(state => state.userRoom.popup_message)
    const isPopup = useSelector(state => state.userRoom.isPopup)
    const current_page = useSelector(state => state.cards.current_page)
    const isDelete = useSelector(state => state.cards.isDelete)

    let location = useLocation()
    let path = location.pathname.split('/')
    const dispatch = useDispatch()
    const container = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    let time = 0
    const toggleVisibility = () => {

        clearTimeout(time)
        time = setTimeout(() => container.current.scrollTop > 200 ? setIsVisible(true) : setIsVisible(false), 500)
    }

    const scrollToTop = () => {

        if (isDelete) {
            container.current.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }
    }

    useEffect(() => {

        scrollToTop(isDelete)
    }, [current_page])

    useEffect(() => {
        
        dispatch(tokenListenerThunk(path))
    }, [])

    return (
        <IntlProvider locale={locale} messages={messages[locale]} defaultLocale="en">  
            <div onScroll={toggleVisibility} ref={container} className="body">
                {linePreloader ? <LinePreloader /> : null}
                <Header scrollToTop={scrollToTop} />
                <div className="container">
                    <Switch>
                        <Route exact path='/'><Home scrollToTop={scrollToTop}/></Route>
                        <Route path='/shop'><Shop scrollToTop={scrollToTop}/></Route>
                        <Route path='/purchases'><Purchases scrollToTop={scrollToTop}/></Route>
                        <Route path='/service'><div className="blue page">Service</div></Route>
                        <Route path='/contacts'><div className="green page">Contacts</div></Route>
                        <Route path='/userroom'><UserRoom scrollToTop={scrollToTop}/></Route>
                        <Route path='/order'>
                            <React.Suspense fallback={<LinePreloader />}>
                                <OrderForm scrollToTop={scrollToTop}/>
                            </React.Suspense>
                        </Route>
                        <Route path='/consult'>
                            <React.Suspense fallback={<LinePreloader />}>
                                <Popup />
                            </React.Suspense>
                        </Route>
                        <Route path='/login'><Login /></Route>
                        <Route path='/personal'><Personal /></Route>
                    </Switch>
                    <ScrollToTop isVisible={isVisible} scrollToTop={scrollToTop} container={container} />
                    {isPopup ? <PopupMessage popup_message={popup_message} deletePopup={() => dispatch(isPopupAC(false))} /> : null}
                </div>
            </div>
        </IntlProvider>
    )
}

export default App
