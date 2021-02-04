import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import s from './Categories.module.css'
import { NavLink } from 'react-router-dom'
import { deleteAllCardsThunk, getCategoriesListThunk, setCardsThunk } from '../../redux/cards_functions'
import { temporaryStorageAC } from '../../redux/storage_reducer'
import { isDeleteAC, categoryNameAC } from '../../redux/cards_reduсer'

const Categories = () => {

    const dispatch = useDispatch()
    const categories = useSelector(state => state.cards.categories)
    const temporary_storage = useSelector(state => state.storage.temporary_storage)
    const current_category = useSelector(state => state.cards.category)

    useEffect(() => {

        dispatch(getCategoriesListThunk())
    }, [])

    const handleClick = (category, category_name) => {

        if (current_category !== category) dispatch(deleteAllCardsThunk())
        dispatch(categoryNameAC(category_name))
        if (temporary_storage.length !== 0) {

            dispatch((temporaryStorageAC([])))
            dispatch(isDeleteAC(true))
            dispatch(setCardsThunk(category, 1, 'relevant'))
        }
    }

    return (
        <div className={s.categories}>
            <ul>
                {categories.map(category =>
                    <NavLink activeClassName={s.active} 
                        onClick={() => handleClick(category.acf.category, category.acf.category_name)} 
                        to={`/shop/${category.acf.category}?filter=relevant&category_name=${category.acf.category_name}`} 
                        key={category.id}>
                        <li >{category.acf.category_name}</li>
                    </NavLink>
                )}
            </ul>
        </div>
    )
}

export default Categories
