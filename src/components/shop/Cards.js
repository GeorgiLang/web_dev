import React, { useEffect } from 'react'
import Card from './Card'
import { setCardsThunk } from '../../redux/cards_functions'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { categoryNameAC } from '../../redux/cards_reduсer'

const Cards = ({
    purchase,
    cards,
    setBasket,
    category_name,
    isDescription,
    setDescription,
    isLoading }) => {

    const dispatch = useDispatch()
    const location = useLocation()
    let category = location.pathname.split('/')[2]
    const searchParam = new URLSearchParams(location.search)
    const _filter = searchParam.get('filter')
    const search_exact = searchParam.get('exact')
    const _category_name = searchParam.get('category_name')
    const _current_page = Number(searchParam.get('page')) ? Number(searchParam.get('page')) : 1

    useEffect(() => {

        if (!search_exact) {

            dispatch(categoryNameAC(_category_name))
            dispatch(setCardsThunk(category, _current_page, _filter))
        }
    }, [_filter, _current_page, category])

    return cards.reduce((card, _card) => {

        let basket = false
        purchase.forEach(purchase => {

            if (purchase.id === _card.child_id) {
                basket = true
            }
        })
        card.push(<Card
            key={_card.id}
            card={_card}
            category_name={category_name}
            setBasket={setBasket}
            basket={basket}
            isLoading={isLoading}
            isDescription={isDescription}
            setDescription={setDescription}
        />)
        return card
    }, [])
}

export default React.memo(Cards)