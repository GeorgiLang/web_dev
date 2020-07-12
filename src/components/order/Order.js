import React, { useEffect } from 'react'
import s from './Order.module.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { FormattedMessage } from 'react-intl';
import Form from './Form'
import { sendOrderThunk } from '../../redux/shopping_reduser'
import { popupMessageAC } from '../../redux/shopping_reduser'
import '../../messages/translate';

const OrderReduxForm = reduxForm({
    form: 'order'
})(Form)

const OrderForm = props => {

    useEffect(() => {

        return () => {
            props.popupMessage()
        }
    }, [])
    
    return (
        <div className={s.order_block}>
            <div className={`${s.popup} ${props.popup ? s.popup_active : null}`}>
                <p>
                    <FormattedMessage
                        id={props.messageID}
                        defaultMessage="От халепа!" />
                </p>
            </div>
            <OrderReduxForm isPreloader={props.isPreloader} onSubmit={(values) => props.onsubmit(values)}
                locale={props.locale}
                setLocale={props.setLocale}
                isDisabled={props.isDisabled} />
            <div className={s.purchases}>
                <div className={s.purchases_inner}>
                    <h2 className={s.title}>{props.cards.length !== 0 
                        ? <FormattedMessage
                            id="order.basket"
                            defaultMessage="Корзина" />
                        : <FormattedMessage
                            id="order.basket_empty"
                            defaultMessage="Корзина пуста" />}
                    </h2>
                    {props.cards.map(card =>
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
                    {props.cards.length !== 0 && <div className={s.total_price}>
                        <Link to="/purchases"><span>редактировать</span></Link>
                        <span>Всего: {props.total.toLocaleString()} грн.</span>
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
        </div>
    )
}

const mapStateToProps = (state) => {

    return {
        isPreloader: state.shopping.preloader,
        popup: state.shopping.popup,
        locale: state.locale.locale,
        cards: state.cards.purchase,
        total: state.cards.total_price,
        isDisabled: state.shopping.isDisabled,
        messageID: state.shopping.messageID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onsubmit: (values) => dispatch(sendOrderThunk(values)),
        popupMessage: () => dispatch(popupMessageAC(false))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)
