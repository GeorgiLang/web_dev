import React from 'react'
import s from './SideBar.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Categories from '../categories/Categories'
import { categoryNameAC } from '../../redux/cards_reduсer'

const SideBar = ({scrollToTop}) => {

    const searched_storage = useSelector(state => state.storage.searched_storage)
    const search_goods = useSelector(state => state.cards.category)
    const isSearch = useSelector(state => state.search.isSearch)
    let history = useHistory()
    const dispatch = useDispatch()

    const redirect = (category, category_name) => {

        dispatch(categoryNameAC(category_name))
        return (
            history.push({
                pathname: `/shop/${category}`,
                search: `?category=${category}&exact=${search_goods}&category_name=${category_name}&search_name=${search_goods}`
            })
        )
    }

    let qty_goods = 0
    let list = []

    if (searched_storage.lenght !== 0) {

        list = searched_storage.map((card, i) => {

            qty_goods += card.cards
            return <li onClick={() => redirect(card.category, card.category_name)} key={i}>{card.category_name} <span>({card.cards})</span></li>
        })
    }

    return (
        isSearch
            ? <div className={s.container}><div>
                <h2>За пошуком <span>{search_goods}</span> знайдено <span>{qty_goods}</span> одиниць товару.</h2>
                <p>Виберіть бажану категорію:</p>
                <ul>
                    {list}
                </ul>
            </div></div>
            : <Categories scrollToTop={scrollToTop}/>
    )
}

export default SideBar