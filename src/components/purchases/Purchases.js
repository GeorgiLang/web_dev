import React, { useEffect } from 'react'
import s from './Purchases.module.css'
import { connect } from 'react-redux'
import { getTotalCostAC } from '../../redux/cards_reduсer'
import { clearPurchasesThunk, setQuentityThunk, setPurchaseToUserData } from '../../redux/cards_functions'
import { Redirect, Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

const Card = ({
    card_name,
    category,
    setBasket,
    id,
    media,
    category_name,
    setQuentity,
    parent_id,
    price,
    quentity }) => {

    return (
        <div className={s.basket_item}>
            <div className={s.product_image}>
                <Link to={`shop/${category}/fullcard/${parent_id}/${id}?category_name=${category_name}&product_name=${card_name}`}>
                    <img src={media} alt={card_name} />
                </Link>
            </div>
            <div className={s.basket_item_box}>
                <div className={s.product_about}>
                    <Link to={`shop/${category}/fullcard/${parent_id}/${id}?category_name=${category_name}&product_name=${card_name}`}>
                        <h3>{card_name}</h3>
                    </Link>
                    <div className={s.product_price_box}>
                        <span className={s.product_price}>{(+price).toLocaleString()}</span>
                        <span className={s.product_price_currency}> грн</span>
                    </div>
                </div>
                <div className={s.basket_price}>
                    <div className={s.total_price}>
                        <span>
                            {(quentity * price).toLocaleString()}
                        </span>
                        <span> грн</span>
                    </div>
                    <div className={s.counter_box}>
                        <span onClick={() => { setQuentity(id, false) }} className={s.counter_minus}>-</span>
                        <span className={s.amount}>{quentity ? quentity : 1}</span>
                        <span onClick={() => { setQuentity(id, true) }} className={s.counter_plus}>+</span>
                    </div>
                </div>
                <div onClick={() => setBasket(id)} className={s.delete_btn}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(255, 255, 255)" width="12px" viewBox="0 0 352 512">
                        <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export const Purchases = ({
    cards,
    total_price,
    getTotalCost,
    setBasket,
    setQuentity,
    scrollToTop,
    setPurchaseToUserData }) => {
       
    const _cards = cards.map(card =>
        
        <Card
            key={card.id}
            id={card.id}
            parent_id={card.parent_id}
            card_name={card.product_name}
            price={+(card.price)}
            media={card.full_media.img1}
            quentity={card.quentity}
            setQuentity={setQuentity}
            setBasket={setBasket}
            category={card.category}
            category_name={card.category_name}
        />
    )

    useEffect(() => {

        getTotalCost()
        return () => {

            setPurchaseToUserData()
        }

    }, [getTotalCost, setPurchaseToUserData])

    useEffect(() => {

        scrollToTop()
    }, [])

    return (
        cards.length === 0
            ? <Redirect exact to="/order" />
            :
            <div className={s.purchases}>
                {_cards}
                <div className={s.action_block}>
                    <Link to="/order"><button className={s.order_button}>
                        <FormattedMessage
                            id="order.check_in"
                            defaultMessage="Оформити замовлення" /></button>
                    </Link>
                    <Link to='/shop'><button className={s.purchases_button}>
                        <FormattedMessage
                            id="order.submit"
                            defaultMessage="Продолжить покупки" /></button>
                    </Link>
                    <p className={s.total_price}><FormattedMessage id="order.total" defaultMessage="Всего"/> : <span>
                        {total_price && cards.length !== 0
                            ? total_price.toLocaleString()
                            : '----'} грн</span>
                    </p>
                </div>
            </div>
    )
}

const mapStateToProps = state => {

    return {
        cards: state.cards.purchase,
        total_price: state.cards.total_price,
        category: state.cards.category,
        category_name: state.cards.category_name
    }
}

const mapDispatchToProps = dispatch => {

    return {
        setQuentity: (id, action) => dispatch(setQuentityThunk(id, action)),
        setBasket: id => {
            dispatch(clearPurchasesThunk(id))
            dispatch(getTotalCostAC())
        },
        getTotalCost: () => dispatch(getTotalCostAC()),
        setPurchaseToUserData: () => dispatch(setPurchaseToUserData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Purchases);
