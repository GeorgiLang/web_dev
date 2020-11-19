import React, { useState } from 'react'
import s from './Card.module.css'
import ProductDescription from './ProductDescription'
import { Link } from 'react-router-dom'

const Card = ({
    card,
    setBasket,
    basket }) => {

    const [isShown, setIsShown] = useState(false)

    let timeout

    const mouseMove = () => {

        clearTimeout(timeout)
        timeout = setTimeout(() => setIsShown(true), 20)
    }

    const mouseLeave = () => {

        clearTimeout(timeout)
        setIsShown(false)
    }

    const putInBasket = () => setBasket(card.id, card.type)

    return (
        <div onMouseMove={mouseMove}
            onMouseLeave={mouseLeave}
            className={s.wrapper}>
            <div className={`${s.card} ${card.acf.in_stock === 'Есть в наличии' ? '' : s.stock} ${isShown ? s.card_active : ''}`}>
                {card.acf.in_stock !== 'Есть в наличии' && <p className={`${s.warning} ${isShown ? s.warning_active : ''}`}>{card.acf.in_stock}</p>}
                <div className={s.card_inner}>
                    <div className={s.product_img}>
                        {card.acf.in_stock === 'Есть в наличии'
                            ? <Link to={`/fullcard/${card.type}/${card.id}/${card.child_id}`}>
                                <img src={card.acf.media}
                                    alt={card.acf.product_name} />
                            </Link>
                            : <img src={card.acf.media}
                                alt={card.acf.product_name} />}
                    </div>
                    {card.acf.in_stock === 'Есть в наличии'
                        ? <Link to={`/fullcard/${card.type}/${card.id}/${card.child_id}`}>
                            <h2 className={s.card_name}>{card.acf.product_name}</h2>
                        </Link>
                        : <h2 className={s.card_name}>{card.acf.product_name}</h2>}
                    <div className={s.card_item}>
                        <span className={card.acf.in_stock === 'Есть в наличии'
                            ? s.in_stock : card.acf.in_stock === 'Ожидается'
                                ? s.wait_stock : s.not_stock}>{card.acf.in_stock}</span>
                        <div className={s.price}>
                            <span>{(+card.acf.old_price).toLocaleString()} ₴</span>
                            <span>{(+card.acf.price).toLocaleString()} ₴</span>
                        </div>
                        <div className={s.action}>
                            <button
                                disabled={!basket && card.acf.in_stock === 'Есть в наличии' ? false : true}
                                onClick={putInBasket}
                                className={basket ? `${s.basket} ${s.basket_active}` : s.basket}>
                                {basket ? <span>В корзине</span> : <span>В корзину</span>}
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
                <ProductDescription className={`${s.description} ${isShown ? s.description_active : ''}`} description={'description'} card={card} />
            </div>
        </div>
    )
}

export default React.memo(Card)