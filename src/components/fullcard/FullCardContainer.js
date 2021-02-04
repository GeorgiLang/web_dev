import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import FullCard from './FullCard'
import { getExtraCardThunkAC, currentIDAC, getFullDescriptionThunk, setFullCardAC} from '../../redux/fullCard_reducer'
import { currentCategoryAC, categoryNameAC } from '../../redux/cards_reduсer'
import { addPurchaseToBasketThunk, setCardInBasketThunk, getCategoriesListThunk } from '../../redux/cards_functions'


const FullCardContainer = ({
    setCategory,
    setBasket,
    setCurrentId,
    isLoadingFullCard,
    product_name,
    full_card,
    purchases,
    scrollToTop,
    current_id,
    setCurrentModel,
    setFullCard,
    _category_name,
    setExtraCard,
    categoryName,
    category_name,
    variants_name,
    full_description,
    getFullDescription,
    addPurchase,
    screenWidth }) => {

    let location = useLocation()
    let path = location.pathname.split('/')  
    let category = path[2]   
    let parent_id = path[4]
    let id = path[5]

    const [extra, isExtra] = useState(false)

    useEffect(() => {

        if(extra) setExtraCard(id, category)

    }, [id])

    useEffect(() => { 

        setBasket(parent_id, category, id)
        setCurrentId(id)
        setCategory(category)
        scrollToTop()
        isExtra(true)  

        return () => {
            setFullCard({
                id: 0,
                product_name: '',
                price: 0,
                old_price: 0,
                parent_id: 0,
                category: '',
                category_name: '',
                current_model: '',
                variants_name: '',
                models: [],
                full_media: {
                    img1: false,
                    thumb: false
                },
                quentity: 1
            })
        }
    }, [])

    useEffect(() => { 

        if (!_category_name) {
            categoryName(full_card.category_name)
        }
    }, [full_card.category_name])

    return (  
        <FullCard
            full_card={full_card}
            purchases={purchases}
            current_id={current_id}
            category={category}
            setCurrentModel={setCurrentModel}
            setExtraCard={setExtraCard}
            variants_name={variants_name}
            addPurchase={addPurchase}
            product_name={product_name}
            category_name={category_name}
            screenWidth={screenWidth}
            isLoadingFullCard={isLoadingFullCard}
            getFullDescription={getFullDescription}
            full_description={full_description}
        />
    )
}

const mapStateToProps = state => {

    return {
        purchases: state.cards.purchase,
        variants_name: state.full_card.full_card.variants_name,
        extra_value: state.full_card.extra_value,
        full_card: state.full_card.full_card,
        isLoadingFullCard: state.full_card.isLoadingFullCard,
        isSpinerPreloader: state.full_card.isSpinerPreloader,
        current_model: state.full_card.current_model,
        current_id: state.full_card.current_id,
        screenWidth: state.cards.screenWidth,
        full_description: state.full_card.full_description,
        product_name: state.full_card.full_card.product_name,
        category_name: state.full_card.full_card.category_name,
        _category_name: state.cards.category_name
    }
}

const mapDispatchToProps = dispatch => {

    return {
        setCurrentId: id => dispatch(currentIDAC(id)),
        setBasket: (parent_id, category, id) =>
            dispatch(setCardInBasketThunk(parent_id, category, true, id)),
        setExtraCard: (id, category) => {
            dispatch(getExtraCardThunkAC(id, category))
            dispatch(currentIDAC(id))
        },
        setCategory: category => dispatch(currentCategoryAC(category)),
        addPurchase: purchase => dispatch(addPurchaseToBasketThunk(purchase)),
        getFullDescription: (id, category) => dispatch(getFullDescriptionThunk(id, category)),
        setFullCard: card => dispatch(setFullCardAC(card)),
        categoryName: category_name => dispatch(categoryNameAC(category_name)),
        getCategoriesList: () => dispatch(getCategoriesListThunk())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullCardContainer)
