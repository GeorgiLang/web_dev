import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import s from './Breadcrumbs.module.css'
import { isDeleteAC, categoryNameAC } from '../../redux/cards_reduсer'
import { setCardsThunk } from '../../redux/cards_functions'
import { temporaryStorageAC } from '../../redux/storage_reducer'

const Breadcrumbs = () => {

    const location = useLocation()
    let section = location.pathname.split('/')[1]
    let category = location.pathname.split('/')[2]

    const searchParam = new URLSearchParams(location.search)
    const search_name = searchParam.get('search_name')

    const category_name = useSelector(state => state.cards.category_name)
    const product_name = useSelector(state => state.full_card.full_card.product_name)
    const temporary_storage = useSelector(state => state.storage.temporary_storage)
    const isLoadingFullCard = useSelector(state => state.full_card.isLoadingFullCard)
    const dispatch = useDispatch()
    const handleClick = () => {

        if (temporary_storage.length !== 0) {

            dispatch((temporaryStorageAC([])))
            dispatch(isDeleteAC(true))
            dispatch(setCardsThunk(category, 1, 'relevant'))
        }
    }

    return (
        section === 'shop' ? <div className={s.container}>
            <div className={s.breadcrumbs}>
                <Link onClick={e => {
                     
                    if (isLoadingFullCard) {

                        e.preventDefault()
                        return
                    }
                    dispatch(categoryNameAC(''))
                }} to='/'>Головна </Link>
                <Link onClick={e => {

                    if (isLoadingFullCard) {
                        e.preventDefault()
                        return
                    }
                    dispatch(categoryNameAC(''))
                }} to='/shop'><i className={s.arrow}></i>Магазин </Link>
                {category_name ? <Link onClick={handleClick} 
                    to={`/shop/${category}?filter=relevant&category_name=${category_name}&product_name=${product_name}`}>
                        <i className={s.arrow}></i>{category_name}</Link> : null}
                {product_name || search_name ? <Link to='/'><i className={s.arrow}></i>{product_name || search_name}</Link> : null}
            </div>
        </div> : null
    )
}

export default Breadcrumbs