import React, { useEffect } from 'react'
import s from './Card.module.css'
import { connect } from 'react-redux'
import Cards from './Cards'
import { useLocation } from 'react-router-dom'
import { deleteAllCardsAC, currentCategoryAC } from '../../redux/cards_reduсer'
import { nextCardsThunk, setCardInBasketThunk, setCardsThunk } from '../../redux/cards_functions'
import { searchThunk } from '../../redux/search_reducer'

const CardContainer = ({
    setCards,
    deleteAllCards,
    nextCards,
    category,
    isLoading,
    purchase,
    cards,
    setBasket,
    searchProduct,
    isDisabled,
    isNotFound }) => {

    let location = useLocation()

    useEffect(() => {

        let path = location.pathname.split('/')
        let category = path[2]
        let model = path[3]
        model === 'all_models' ? setCards(category) : searchProduct(model)

        return () => {
            deleteAllCards()
        }

    }, [setCards, deleteAllCards, searchProduct, location.pathname])

    return (

        <div className={s.cards}>
            {isLoading ? <Cards
                cards={cards}
                purchase={purchase}
                setBasket={setBasket} /> : null}
            {isNotFound ?
                <div className={s.hint}>
                    <p>Нічого не знайдено, спробуйте змінити запит</p>
                </div>
                : null}
            <div className={s.wrapper_button}>
                {cards.length !== 0
                    && <button
                        disabled={isDisabled}
                        className={s.more}
                        onClick={() => nextCards(category)}>{isDisabled ? 'No more' : 'More'}</button>}
            </div>
        </div>
    )
}

const mapStateToProps = state => {

    return {
        isLoadingCard: state.cards.isLoadingCard,
        cards: state.cards.cards,
        category: state.cards.category,
        current_page: state.cards.current_page,
        isLoading: state.cards.isLoading,
        isDisabled: state.cards.isDisabled,
        purchase: state.cards.purchase,
        isNotFound: state.search.isNotFound
    }
}

const mapDispatchToProps = dispatch => {

    return {
        nextCards: (page, category) => dispatch(nextCardsThunk(page, category)),
        setCards: (category, model) => {
            dispatch(currentCategoryAC(category))
            dispatch(setCardsThunk(category, model))
        },
        setBasket: (id, category) => dispatch(setCardInBasketThunk(id, category, false)),
        deleteAllCards: () => dispatch(deleteAllCardsAC()),
        searchProduct: model => dispatch(searchThunk(model))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer)