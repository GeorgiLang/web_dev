import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import FullCard from './FullCard'
import { getExtraCardThunkAC, currentIDAC, isLoadingBasketAC } from '../../redux/fullCard_reducer'
import { currentCategoryAC } from '../../redux/cards_reduсer'
import { addPurchaseToBasketThunk, setCardInBasketThunk } from '../../redux/cards_functions'


const FullCardContainer = ({
    setCategory,
    setBasket,
    setCurrentId,
    isLoading,
    loading,
    isLoad,
    full_card,
    purchases,
    current_id,
    category,
    setCurrentModel,
    setExtraCard,
    variants_name,
    addPurchase,
    screenWidth }) => {

    let location = useLocation()

    useEffect(() => {

        let path = location.pathname.split('/')
        let id = path[4]
        let parent_id = path[3]
        let category = path[2]

        setBasket(parent_id, category, id)
        setCurrentId(id)
        setCategory(category)

        return () => {
            loading()
        }
    }, [setBasket, setCategory, loading, setCurrentId])

    return (
        <>{isLoading && !isLoad
            ? <FullCard
                full_card={full_card}
                purchases={purchases}
                current_id={current_id}
                category={category}
                setCurrentModel={setCurrentModel}
                setExtraCard={setExtraCard}
                variants_name={variants_name}
                addPurchase={addPurchase}
                screenWidth={screenWidth} />
            : null}</>
    )
}

const mapStateToProps = state => {

    return {
        purchases: state.cards.purchase,
        variants_name: state.full_card.full_card.variants_name,
        extra_value: state.full_card.extra_value,
        full_card: state.full_card.full_card,
        isLoading: state.full_card.isLoadingFullCard,
        isLoad: state.full_card.isSpinerPreloader,
        category: state.cards.category,
        current_model: state.full_card.current_model,
        current_id: state.full_card.current_id,
        screenWidth: state.cards.screenWidth
    }
}

const mapDispatchToProps = dispatch => {

    return {
        setCurrentId: id => dispatch(currentIDAC(id)),
        setBasket: (parent_id, category, id) =>
            dispatch(setCardInBasketThunk(parent_id, category, true, id)),
        loading: () => dispatch(isLoadingBasketAC(false)),
        setExtraCard: (id, category) => {
            dispatch(getExtraCardThunkAC(id, category))
            dispatch(currentIDAC(id))
        },
        setCategory: category => dispatch(currentCategoryAC(category)),
        addPurchase: purchase => dispatch(addPurchaseToBasketThunk(purchase))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullCardContainer)
