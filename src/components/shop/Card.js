import React, { useState, useEffect } from 'react'
import s from './Shop.module.css'
import ProductDescription from './ProductDescription'
import { Link } from 'react-router-dom'
import Sceleton from '../../common/Sceleton'
import { setCardInBasketThunk } from '../../redux/cards_functions'
import { useDispatch } from 'react-redux'
import { FormattedMessage } from 'react-intl'

const ImageCard = ({ card, category_name }) => {

    let [isImage, setImage] = useState(false)
    const mainImage = new Image()

    mainImage.src = card.acf.media
    mainImage.onload = () => {
        setImage(true)
    }
    useEffect(() => {

        return () => {
            mainImage.onload = () => { return }
        }
    }, [])

    const handleClick = e => {

        if (!card.acf.in_stock) e.preventDefault()
    }

    return (
        <div className={s.product_img}>
            <Link onClick={e => handleClick(e)}
                to={`/shop/${card.type}/fullcard/${card.id}/${card.child_id}?filter=relevant&category_name=${category_name}&product_name=${card.acf.product_name}`} >
                <img style={{ opacity: `${isImage ? '1' : '0'}` }} src={card.acf.media}
                    alt={card.acf.product_name} />
            </Link>
            {!isImage ? <Sceleton className={s.preloader_product_img} isLoading={true} background={'rgb(215, 215, 215)'} /> : null}
        </div>
    )
}
const Card = ({
    card,
    basket,
    category_name,
    isLoading }) => {

    const dispatch = useDispatch()
    let [isDescription, setDescription] = useState(false)
    const putInBasket = e => {

        e.stopPropagation()
        dispatch(setCardInBasketThunk(card.id, card.type))
    }
    return (
        <div onClick={() => setDescription(!card.acf.in_stock ? isDescription : !isDescription)}
            className={`${s.card} ${card.acf.in_stock ? '' : s.stock} ${isDescription ? s.card_active : ''}`}>
            <div className={s.card_inner}>
                <ImageCard card={card} category_name={category_name} />
                <Sceleton className={s.preloader_card_name} isLoading={isLoading} background={'rgb(215, 215, 215)'}>
                    <Link onClick={e => card.acf.in_stock ? null : e.preventDefault()}
                        to={`/shop/${card.type}/fullcard/${card.id}/${card.child_id}?filter=relevant&category_name=${category_name}&product_name=${card.acf.product_name}`}>
                        <h2 className={s.card_name}>{card.acf.product_name}</h2>
                    </Link>
                </Sceleton>
                <div className={s.card_item}>
                    <Sceleton className={s.preloader_stock} isLoading={isLoading} background={'rgb(215, 215, 215)'}>
                        <span className={card.acf.in_stock ? s.in_stock : s.not_stock}>{card.acf.in_stock ? 'In stock' : 'Not in stock'}</span>
                    </Sceleton>
                    <Sceleton className={s.preloader_price} isLoading={isLoading} background={'rgb(215, 215, 215)'}>
                        <div className={s.price}>
                            <span>{(+card.acf.old_price).toLocaleString()} ₴</span>
                            <span>{(+card.acf.price).toLocaleString()} ₴</span>
                        </div>
                    </Sceleton>
                    <div className={s.action}>
                        <button
                            disabled={!basket && card.acf.in_stock ? false : true}
                            onClick={e => putInBasket(e)}
                            className={basket ? `${s.basket} ${s.basket_active}` : s.basket}>
                            {basket ? <span><FormattedMessage
                                id="order.in_basket"
                                defaultMessage="В кошику" /></span>
                                : <span><FormattedMessage
                                    id="order.to_basket"
                                    defaultMessage="В кошик" /></span>}
                            <div className={s.basket_icons}>
                                <svg className={s.basket_svg} width="26px" height="22px" strokeWidth="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" />
                                </svg>
                                <svg className={s.check} width="24px" height="20px" strokeWidth="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            {card.acf.in_stock ? <ProductDescription className={`${s.description} ${isDescription ? s.description_active : ''}`}
                description={card.acf.description} />
                : null}
        </div>
    )
}

export default React.memo(Card)