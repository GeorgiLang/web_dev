import React, { useEffect } from 'react'
import s from './Order.module.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { isPopupAC,
    setModalNameAC,
    setSubmitNameAC } from '../../redux/user_room_reducer'
import '../../messages/translate'
import { preloaderAC, isDisabledAC } from '../../redux/shopping_reducer'
import Personal from '../personal/Personal'
import Preloader from '../../common/Preloader'
import { getTotalCostAC } from '../../redux/cards_reduсer'
import { submitOrderThunk } from '../../redux/shopping_reducer'

const OrderForm = ({
    cards,
    total,
    setModalName,
    setSubmitName,
    submitOrder,
    isPreloader,
    isDisabled,
    getTotalCost,
    disabled,
    submit_name,
    isValidToken,
    isEditButton,
    preloader
}) => {

    useEffect(() => {
        
        preloader()
        disabled()
        getTotalCost()
        setSubmitName("login.confirm_order")

    }, [setSubmitName, setModalName, preloader, disabled, getTotalCost])

    const sign_in = () => {

        setModalName("login")
        setSubmitName("login.sign_in")
    }

    const sign_up = () => {

        setModalName("register")
        setSubmitName("login.sign_up")
    }

    return (
        <div className={s.order_block}>
            <div className={s.purchases}>
                <div className={s.purchases_inner}>
                    <h2 className={s.title}>{cards.length !== 0
                        ? <FormattedMessage
                            id="order.basket"
                            defaultMessage="Корзина" />
                        : <FormattedMessage
                            id="order.basket_empty"
                            defaultMessage="Корзина пуста" />}
                    </h2>
                    {cards.map(card =>
                        <div key={card.id} className={s.card}>
                            <div className={s.product_image}>
                                <Link to={`/fullcard/${card.category}/${card.parent_id}/${card.id}`}>
                                    <img src={card.full_media.img1} alt={card.product_name} />
                                </Link>
                            </div>
                            <div className={s.card_inner}>
                                <div className={s.description}>
                                    <Link to={`/fullcard/${card.category}/${card.parent_id}/${card.id}`}>
                                        <h3 className={s.card_name}>{card.product_name}</h3>
                                    </Link>
                                    <p className={s.price}>{(+card.price).toLocaleString()} грн.</p>
                                </div>
                                <div className={s.total}>
                                    <span>{card.quentity} шт.</span>
                                    <span>{(+card.price * card.quentity).toLocaleString()} грн.</span>
                                </div>
                            </div>
                        </div>
                    )}
                    {cards.length !== 0 && <div className={s.total_price}>
                        <Link to="/purchases"><span>редактировать</span></Link>
                        <span>Всего: {total.toLocaleString()} грн.</span>
                    </div>}
                </div>
                <Link className={s.to_shopping} to='/shop'>
                    <button className={s.submit}>
                        <FormattedMessage
                            id="order.submit"
                            defaultMessage="Продолжить покупки" />
                    </button>
                </Link>
            </div>
            {isValidToken ? null : <div className={s.switch_btn}>
                <Link onClick={sign_in} to="/login"><button disabled={isDisabled}>Я постоянный клиент</button></Link>
                <Link onClick={sign_up} to="/login"><button disabled={isDisabled}>Зарегестрироваться</button></Link>
            </div> }
            {isValidToken && cards.length > 0 ? <Personal /> : null}
            {!isEditButton && isValidToken && cards.length > 0 ?  <button
                onClick={submitOrder}
                className={s.confirm}
                type="button"
                disabled={isDisabled}>
                {isPreloader
                    ? <Preloader className={s.preloader} size="40px" />
                    : <FormattedMessage
                        id={submit_name}
                        defaultMessage="submite" />}
            </button> : null}
        </div>
    )
}

const mapStateToProps = state => {

    return {
        popup: state.shopping.popup,
        cards: state.cards.purchase,
        total: state.cards.total_price,
        isPreloader: state.shopping.preloader,
        isDisabled: state.shopping.isDisabled,
        modal_name: state.userRoom.modal_name,
        isValidToken: state.userRoom.isValidToken,
        submit_name: state.userRoom.submit_name,
        isEditButton: state.userRoom.editButton
    }
}

const mapDispatchToProps = dispatch => {

    return {
        isPopup: () => dispatch(isPopupAC(true)),
        setModalName: modal_name => dispatch(setModalNameAC(modal_name)),
        setSubmitName: submit_name => dispatch(setSubmitNameAC(submit_name)),
        preloader: () => dispatch(preloaderAC(false)),
        disabled: () => dispatch(isDisabledAC(false)),
        getTotalCost: () => dispatch(getTotalCostAC()),
        submitOrder: () => dispatch(submitOrderThunk())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)
