import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import s from './Breadcrumbs.module.css'
import { isDeleteAC, categoryNameAC } from '../../redux/cards_reduсer'
import { setCardsThunk } from '../../redux/cards_functions'
import { temporaryStorageAC } from '../../redux/storage_reducer'
import { lookForAC } from '../../redux/search_reducer'

const Breadcrumbs = () => {

    const location = useLocation()
    let path = location.pathname.split('/')
    let section = path[1]
    let category = path[2]
    let fullcard = path[3]

    const searchParam = new URLSearchParams(location.search)
    const _product_name = searchParam.get('product_name')
    const isPproduct_name = searchParam.has('product_name')

    const category_name = useSelector(state => state.cards.category_name)
    const product_name = useSelector(state => state.full_card.full_card.product_name)
    const temporary_storage = useSelector(state => state.storage.temporary_storage)
    const isLoadingFullCard = useSelector(state => state.full_card.isLoadingFullCard)
    const look_for = useSelector(state => state.search.look_for)

    const dispatch = useDispatch()
    const handleClick = () => {

        if (temporary_storage.length !== 0) {

            dispatch((temporaryStorageAC([])))
            dispatch(isDeleteAC(true))
            dispatch(setCardsThunk(category, 1, 'relevant'))
            dispatch(lookForAC(''))
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
                {fullcard === 'fullcard' && isPproduct_name && !look_for ? <Link to='/'><i className={s.arrow}></i>{_product_name}</Link> : null}
                {look_for ? <Link
                    to={`/shop/${category}?filter=${temporary_storage.filter}&category_name=${category_name}&product_name=${product_name}`}>
                        <i className={s.arrow}></i>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#444444" width="12px" height="12px" viewBox="0 0 512 512">
                            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                        </svg> {look_for}</Link> : null}
                {fullcard === 'fullcard' && look_for ? <Link to='/'><i className={s.arrow}></i>{_product_name}</Link> : null}
            </div>
        </div> : null
    )
}

export default Breadcrumbs