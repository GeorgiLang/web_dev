import React from 'react'
import s from './FullCard.module.css'
import ProductDescription from '../card/ProductDescription'
import ImageGallery from 'react-image-gallery'
import ColorButtons from './ColorButtons'
import ExtraValuesButtons from './ExtraValuesButtons'
import { Link } from 'react-router-dom'

const FullCard = props => {

    let isDisabled = props.purchases.some(card => card.id === props.full_card.id)

    let current_card = { ...props.full_card }
    let current_model = ''
    let current_value = ''
    let images = []
    let models = []
    let img_obj = {
        original: '',
        thumbnail: '',
        originalAlt: props.full_card.product_name
    }
    let current_data = {
        color: '',
        color_name: '',
        value: '',
        id: ''
    }

    for (let i = 0; i < props.full_card.models.length; i++) {

        let models_group = props.full_card.models[i].models_vars

        if (props.full_card.models[i].color) {

            for (let keys in models_group) {

                if (models_group[keys].id) {
                    current_data.color_name = props.full_card.models[i].color_name
                    current_data.color = props.full_card.models[i].color
                    current_data.value = models_group[keys].value
                    current_data.id = models_group[keys].id
                    models.push(Object.assign({}, current_data))
                }
            }
        }
    }

    for (let i = 0; i < models.length; i++) {

        if (models[i].id === props.current_id) {
            current_model = models[i].color
            current_value = models[i].value
            break
        }
    }

    let media = props.full_card.full_media
    let count = 0
    for (let key in media) {
        if (media[key]) {
            count++
        }
    }

    for (let i = 1; i <= Math.floor(count / 2); i++) {

        for (let key in media) {

            if (key === `img${i}`) {

                img_obj.original = media[key]
            } else if (key === `thumb${i}`) {

                img_obj.thumbnail = media[key]
            }
        }
        images.push(Object.assign({}, img_obj))
    }

    return (
        <div className={s.card}>
            <p className={s.product_id}>ID:&nbsp;{props.full_card.id}</p>
            <h2 className={s.product_name}>{props.full_card.product_name}</h2>
            <ImageGallery
                items={images}
                showNav={false}
                showPlayButton={false}
                slideDuration={350}
                additionalClass={s.gallery}
                showFullscreenButton={true}
                useBrowserFullscreen={false}
                slideOnThumbnailOver={true} />
            <div className={s.actions}>
                <div className={s.group}>
                    <div className={s.group_color}>
                        <p>Цвет:</p>
                        <ColorButtons
                            parent_id={props.full_card.parent_id}
                            category={props.category}
                            current_value={current_value}
                            current_model={current_model}
                            setCurrentModel={props.setCurrentModel}
                            setExtraCard={props.setExtraCard}
                            models={models}
                            models_group={props.full_card.models} />
                    </div>
                    <div className={s.group_extra}>
                        <p>{props.variants_name}:</p>
                        <ExtraValuesButtons
                            variants_name={props.variants_name}
                            parent_id={props.full_card.parent_id}
                            current_value={current_value}
                            current_model={current_model}
                            category={props.category}
                            models={models}
                            setExtraCard={props.setExtraCard}
                        />
                    </div>
                </div>
                <div className={s.price}>
                    <span>{(+props.full_card.old_price).toLocaleString()} ₴</span>
                    <span>{(+props.full_card.price).toLocaleString()} ₴</span>
                </div>
                <div className={s.action_buttons}>
                    <button className={s.order_button}
                        disabled={isDisabled}
                        onClick={() => props.addPurchase(current_card)}>
                        {isDisabled ? 'Уже в корзине' : 'Добавить в корзину'}
                    </button>
                    <Link to='/shop'>
                        <button className={s.purchases_button}>Продолжить покупки</button>
                    </Link>
                    <Link to="/order">
                        <button className={s.order_button} onClick={() => props.addPurchase(current_card)}>Оформить</button>
                    </Link>
                </div>
            </div>
            <div className={s.description_block}>
                <h3>Характеристики:</h3>
                <ProductDescription className={s.description} description={'full_description'} card={props.full_card} />
            </div>
        </div>
    )
}

export default React.memo(FullCard)