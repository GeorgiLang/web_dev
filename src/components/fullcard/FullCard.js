import React, { useState } from 'react'
import s from './FullCard.module.css'
import ProductDescription from '../shop/ProductDescription'
import SwiperCore, { Navigation, Thumbs, Zoom } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import ColorButtons from './ColorButtons'
import ExtraValuesButtons from './ExtraValuesButtons'
import { Link } from 'react-router-dom'
import Sceleton from '../../common/Sceleton'
import { FormattedMessage } from 'react-intl'

const FullCard = ({
    full_card,
    purchases,
    current_id,
    category,
    setCurrentModel,
    setExtraCard,
    variants_name,
    category_name,
    addPurchase,
    getFullDescription,
    full_description,
    isLoadingFullCard }) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const [isDescription, setDescription] = useState(false)

    const getDescription = () => {

        setDescription(!isDescription)
        if (!full_description.fld_name1 && !full_description.fld_value1) {

            getFullDescription(full_card.parent_id, category)
        }
    }

    SwiperCore.use([Navigation, Thumbs, Zoom])

    let isDisabled = purchases.some(card => card.id === full_card.id)
    let isTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints
    let current_card = full_card
    let current_model = ''
    let current_value = ''
    let images = []
    let models = []
    let img_obj = {
        original: '',
        thumbnail: '',
        originalAlt: full_card.product_name
    }
    let current_data = {
        product_name: '',
        color: '',
        color_name: '',
        value: '',
        id: ''
    }
    for (let i = 0; i < full_card.models.length; i++) {

        let models_group = full_card.models[i].models_vars

        if (full_card.models[i].color) {

            for (let keys in models_group) {

                if (models_group[keys].id) {

                    current_data.color_name = full_card.models[i].color_name
                    current_data.color = full_card.models[i].color
                    current_data.value = models_group[keys].value
                    current_data.id = models_group[keys].id
                    current_data.product_name = models_group[keys].product_name
                    models.push(Object.assign({}, current_data))
                }
            }
        }
    }
    for (let i = 0; i < models.length; i++) {

        if (models[i].id === current_id) {
            current_model = models[i].color
            current_value = models[i].value
            break
        }
    }
    let media = full_card.full_media
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
    const mainImage = new Image()
    let [isImage, setImage] = useState(false)

    if (full_card.full_media.img1) {

        mainImage.src = images[0].original
        mainImage.onload = () => {
            setImage(true)
        }
    }
    const slides = images.map((slide, i) =>

        <SwiperSlide key={i}>
            <div className="swiper-zoom-container">
                <img src={slide.original}
                    alt={slide.originalAlt}
                    width='100%' />
            </div>
        </SwiperSlide>
    )

    const thumbsSlides = images.map((slide, i) =>

        <SwiperSlide key={i} >
            <img src={slide.thumbnail}
                alt={slide.originalAlt} />
        </SwiperSlide>
    )

    return (
        <div className={s.card}>
            <Sceleton className={s.preloader_box_product_name} isLoading={isLoadingFullCard}>
                <div className={s.product_name}>
                    <p className={s.product_id}>ID:&nbsp;{full_card.id}</p>
                    <h2>{full_card.product_name}</h2>
                </div>
            </Sceleton>
            <div className={s.box_gallery}>
                <div className={s.gallery} >
                    <Swiper id='main'
                        style={{ opacity: `${isLoadingFullCard ? '0' : '1'}` }}
                        spaceBetween={50}
                        loopedSlides={images.length}
                        loop={true}
                        slidesPerView={1}
                        zoom={true}
                        navigation={isTouchScreen ? false : true}
                        thumbs={{ swiper: thumbsSwiper }}>
                        {slides}
                        {!isImage ? <Sceleton className={s.preloader_box_gallery} isLoading={true} isSwipe={true} /> : null}
                    </Swiper>
                    <Swiper id='thumbs'
                        style={{ opacity: `${isLoadingFullCard ? '0' : '1'}` }}
                        spaceBetween={5}
                        loop={images.length > 6}
                        freeMode={true}
                        slidesPerView={images.length < 6 ? images.length : 6}
                        watchSlidesVisibility={true}
                        onSwiper={setThumbsSwiper}>
                        {thumbsSlides}
                        {!isImage ? <Sceleton className={s.preloader_box_gallery} isLoading={true} isSwipe={true} /> : null}
                    </Swiper>
                </div>
                {isLoadingFullCard ? <Sceleton className={s.preloader_box_gallery} isLoading={true} isSwipe={true} /> : null}
            </div>
            <div className={s.actions}>
                <Sceleton className={s.preloader_box_group} isLoading={isLoadingFullCard}>
                    <div className={s.group}>
                        <div className={s.group_color}>
                            <p>Колір:</p>
                            <ColorButtons
                                current_model={current_model}
                                category_name={category_name}
                                setCurrentModel={setCurrentModel}
                                setExtraCard={setExtraCard}
                                models_group={full_card.models} />
                        </div>
                        <div className={s.group_extra}>
                            <p>{variants_name}:</p>
                            <ExtraValuesButtons
                                variants_name={variants_name}
                                current_value={current_value}
                                current_model={current_model}
                                category_name={category_name}
                                models={models} />
                        </div>
                    </div>
                </Sceleton>
                <Sceleton className={s.preloader_box_price} isLoading={isLoadingFullCard} >
                    <div className={s.price}>
                        <p>{(+full_card.old_price).toLocaleString()} ₴</p>
                        <p>{(+full_card.price).toLocaleString()} ₴</p>
                    </div>
                </Sceleton>
                <div className={s.action_buttons}>
                    <button className={s.order_button}
                        disabled={isDisabled && !isLoadingFullCard}
                        onClick={() => addPurchase(current_card)}>
                        {isDisabled ? <FormattedMessage
                            id="order.is_in_basket"
                            defaultMessage="Вже в кошику" />
                            : <FormattedMessage
                                id="order.to_basket"
                                defaultMessage="В кошик" />}
                    </button>
                    <Link to='/shop'>
                        <button disabled={isLoadingFullCard}
                            className={s.purchases_button}><FormattedMessage
                                id="order.submit"
                                defaultMessage="Продолжить покупки" /></button>
                    </Link>
                    <Link to="/order">
                        <button disabled={isLoadingFullCard}
                            className={s.order_button}
                            onClick={() => addPurchase(current_card)}><FormattedMessage
                                id="order.check_in"
                                defaultMessage="Оформити замовлення" /></button>
                    </Link>
                </div>
            </div>
            <div className={s.description_block}>
                <button disabled={isLoadingFullCard}
                    className={s.description_btn}
                    onClick={getDescription}><FormattedMessage
                        id="order.description"
                        defaultMessage="Характеристики" />
                    {!full_description.fld_name1 && isDescription ? <svg version="1.1"
                        id="loader-1"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px" y="0px" width="40px" height="40px"
                        viewBox="0 0 40 40">
                        <path opacity="0.8" fill="#808080" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z" />
                        <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z">
                            <animateTransform attributeType="xml"
                                attributeName="transform"
                                type="rotate"
                                from="0 20 20"
                                to="360 20 20"
                                dur="1s"
                                repeatCount="indefinite" />
                        </path>
                    </svg> : !isDescription ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" /></svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z" /></svg>}
                </button>
                {isDescription ? <ProductDescription className={s.description} description={full_description} /> : null}
            </div>
        </div>
    )
}

export default React.memo(FullCard)