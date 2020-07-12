import React, { useState, useRef } from 'react'
import './index.css'
import Header from './components/header/Header'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import CardContainer from './components/card/CardContainer'
import FullCardContainer from './components/fullcard/FullCardContainer'
import Purchases from './components/purchases/Purchases'
import Categories from './components/categories/Categories'
import LinePreloader from './common/LinePreloader'
import I18Provider from './messages/provider'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import logoReact from './img/logo512.png'
import logoWP from './img/WP-logotype.png'

const OrderForm = React.lazy(() => import('./components/order/Order'))
const Popup = React.lazy(() => import('./components/popup/Popup'))

const is_touch_enabled = () => { 

    return ( 'ontouchstart' in window ) ||  
            ( navigator.maxTouchPoints > 0 ) ||  
            ( navigator.msMaxTouchPoints > 0 )
}

const isTouchscreen = is_touch_enabled()

const App = props => {

    const [headerStyle, setHeaderStyle] = useState()
    const body = useRef();

    useScrollPosition(({ prevPos, currPos }) => {
        
        let bottom = body.current.getBoundingClientRect().bottom

        let isVisible = (currPos.y > prevPos.y - 1 &&  bottom > 1000) || currPos.y > -110 
         
        const shouldBeStyle = {
            transform: isVisible ? 'translateY(0%)' : 'translateY(-100%)'
        }

        if (JSON.stringify(shouldBeStyle) === JSON.stringify(headerStyle)) return

        setHeaderStyle(shouldBeStyle)
        
    }, [headerStyle], null, !isTouchscreen, 600 )

    return (
        <I18Provider locale={props.locale}>
            <div className="bg_body"></div>
            {props.linePreloader ? <LinePreloader /> : null}
            <Header scroll={{ ...headerStyle }} />
            <div ref={body} className="body">
                <div className="container">
                    <Switch>
                        <Route exact path='/'>
                            <div className="yellow page">
                                <div className="logos">
                                    <div><img src={logoWP} alt="LogoWP"/></div>
                                    <div><img src={logoReact} alt="LogoReact"/></div>
                                </div>
                            </div>
                        </Route>
                        <Route path='/shop/:category/:models'><CardContainer action={isTouchscreen} /></Route>
                        <Route path='/purchases'><Purchases /></Route>
                        <Route path='/shop'><Categories /></Route>
                        <Route path='/service'><div className="blue page">Service</div></Route>
                        <Route path='/price'><div className="pink page">Price</div></Route>
                        <Route path='/contacts'><div className="green page">Contacts</div></Route>
                        <Route path='/order'> 
                            <React.Suspense fallback={<LinePreloader/>}>
                                <OrderForm />
                            </React.Suspense>
                        </Route>
                        <Route path='/fullcard/:category/:id/:id'><FullCardContainer /></Route>
                        <Route path='/consult'>
                            <React.Suspense fallback={<LinePreloader/>}>
                                <Popup />
                            </React.Suspense> 
                        </Route>
                    </Switch>
                </div>
            </div>
        </I18Provider>
    )
}

const mapStateToProps = state => {
    return {
        locale: state.locale.locale,
        popup: state.consult.isVisible,
        categories: state.cards.categories,
        linePreloader: state.preloader.linePreloader
    }
}

export default connect(mapStateToProps)(App);
