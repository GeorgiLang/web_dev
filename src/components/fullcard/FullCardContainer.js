import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import FullCard from './FullCard'
import { getExtraCardThunkAC, currentIDAC, isLoadingBasketAC } from '../../redux/fullCard_reduser'
import { currentCategoryAC,  addPurchaseToBasketAC } from '../../redux/cards_reduser'
import { setCardInBasketThunk } from '../../redux/cards_functions'


const FullCardContainer = props => {

    let location = useLocation()
    let { setCategory, setBasket, setCurrentId, isLoading, loading, isLoad } = props
    
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
    }, [setBasket])

    return (
        <>{isLoading  && !isLoad
            ? <FullCard {...props} />
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
        current_id: state.full_card.current_id
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
        addPurchase: purchase => dispatch(addPurchaseToBasketAC(purchase))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullCardContainer)