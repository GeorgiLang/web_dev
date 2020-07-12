import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import s from './Categories.module.css'
import { Link } from 'react-router-dom'
import { getCategoriesListThunk } from '../../redux/cards_functions'

const ListCategories = props => {
    
    const categories = props.categories.map(category =>
        <Link to={`/shop/${category.acf.category}/all_models`} key={category.id}>
            <li>{category.acf.category_name}</li>
        </Link>
    )

    return (
       <ul>
           {categories}
       </ul>
    )
}

const Categories = props => {

    let { setCategories, categories } = props

    useEffect(() => {
        
        setCategories()
    }, [setCategories]);
    
    return (
        <div className={s.categories}>
            <ListCategories categories={categories}/>
        </div>
    )
}

const mapStateToProps = state => {

    return {
        categories: state.cards.categories
    }
}

const mapDispatchToProps = dispatch => {

    return {
        setCategories: () => dispatch(getCategoriesListThunk())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
