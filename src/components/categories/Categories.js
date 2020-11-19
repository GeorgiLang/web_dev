import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import s from './Categories.module.css'
import { Link } from 'react-router-dom'
import { getCategoriesListThunk } from '../../redux/cards_functions'


const Categories = ({
    setCategories,
    categories }) => {

    useEffect(() => {

        setCategories()
    }, [setCategories]);

    return (
        <div className={s.categories}>
            <ul>
                {categories.map(category =>
                    <Link to={`/shop/${category.acf.category}/all_models`} key={category.id}>
                        <li>{category.acf.category_name}</li>
                    </Link>
                )}
            </ul>
        </div>
    )
}

const mapStateToProps = state => {

    return {
        categories: state.cards.categories,
        current_page: state.cards.current_page
    }
}

const mapDispatchToProps = dispatch => {

    return {
        setCategories: () => dispatch(getCategoriesListThunk())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
