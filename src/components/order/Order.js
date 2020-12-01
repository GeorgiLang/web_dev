import React, { useEffect } from 'react'
import s from './Order.module.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { popupMessageAC, 
    isPopupAC, 
    setModalNameAC, 
    setSubmitNameAC, 
    formThunk } from '../../redux/user_room_reducer'
import '../../messages/translate'
import Form from '../form/Form'
import { preloaderAC, isDisabledAC } from '../../redux/shopping_reducer'

const OrderForm = ({
    cards,
    total,
    onsubmit,
    popupMessage,
    setModalName,
    setSubmitName,
    isPreloader,
    isDisabled,
    disabled,
    modal_name,
    submit_name,
    isValidToken,
    tel,
    preloader
}) => {

    useEffect(() => {

        preloader()
        disabled()
        setModalName("send_order")
        setSubmitName("login.confirm_order")
    
    }, [ setSubmitName, setModalName, preloader, disabled])

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
            {!isValidToken ? <div className={s.switch_btn}>
                <Link onClick={sign_in} to="/login"><button disabled={isDisabled}>Я постоянный клиент</button></Link>
                <Link onClick={sign_up} to="/login"><button disabled={isDisabled}>Зарегестрироваться</button></Link>
            </div> : null}
            {cards.length !== 0
                ? <Form
                    isPreloader={isPreloader}
                    isDisabled={isDisabled}
                    submit_name={submit_name}
                    onSubmit={values => onsubmit(values)}
                    tel={tel}
                    modal_name={modal_name} />
                : null}
        </div>
    )
}

const mapStateToProps = state => {

    return {
        popup: state.shopping.popup,
        cards: state.cards.purchase,
        total: state.cards.total_price,
        messageID: state.shopping.messageID,
        isPreloader: state.shopping.preloader,
        isDisabled: state.shopping.isDisabled,
        modal_name: state.userRoom.modal_name,
        tel: state.userRoom.userData.tel,
        isVerifyEmail: state.userRoom.isVerifyEmail,
        isValidToken: state.userRoom.isValidToken,
        submit_name: state.userRoom.submit_name
    }
}

const mapDispatchToProps = dispatch => {

    return {
        isPopup: () => dispatch(isPopupAC(true)),
        popupMessage: message_id => dispatch(popupMessageAC(message_id)),
        onsubmit: values => dispatch(formThunk(values)),
        setModalName: modal_name => dispatch(setModalNameAC(modal_name)),
        setSubmitName: submit_name => dispatch(setSubmitNameAC(submit_name)),
        preloader: () => dispatch(preloaderAC(false)),
        disabled: () => dispatch(isDisabledAC(false))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)
