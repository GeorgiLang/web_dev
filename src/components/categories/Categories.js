import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import s from './Categories.module.css'
import { NavLink, useHistory } from 'react-router-dom'
import { deleteAllCardsThunk, getCategoriesListThunk, setCardsThunk } from '../../redux/cards_functions'
import { temporaryStorageAC } from '../../redux/storage_reducer'
import { isDeleteAC, categoryNameAC } from '../../redux/cards_reduсer'
import { lookForAC } from '../../redux/search_reducer'
import Sceleton from '../../common/Sceleton'


const Categories = ({ scrollToTop }) => {

    const dispatch = useDispatch()
    const categories = useSelector(state => state.cards.categories)
    const temporary_storage = useSelector(state => state.storage.temporary_storage)
    const current_category = useSelector(state => state.cards.category)
    const base_storage = useSelector(state => state.storage.base_storage)
    let history = useHistory()

    useEffect(() => {

        dispatch(getCategoriesListThunk())
    }, [])

    let filter = 'relevant'

    const handleClick = (e, category, category_name) => {

        e.preventDefault()

        scrollToTop()
        dispatch(lookForAC(''))
        dispatch(categoryNameAC(category_name))

        base_storage.forEach(card => {

            if (card.category === category) {
                filter = card.filter
            }
        })

        if (current_category !== category) {
            dispatch(deleteAllCardsThunk())
        }

        if (temporary_storage.length !== 0) {

            dispatch((temporaryStorageAC([])))
            dispatch(isDeleteAC(true))
            dispatch(setCardsThunk(category, 1))
        }

        history.push({

            pathname: `/shop/${category}`,
            search: `?filter=${filter}`
        })
    }

    return (
        <div className={s.categories}>
            <Sceleton className={s.preloader_categories} isLoading={categories.length === 1} background={'rgb(215, 215, 215)'}>
                <ul>
                    {categories.map(category =>
                        <li key={category.id} >
                            <NavLink to={`/shop/${category.acf.category}?filter=${filter}`}
                                onClick={e => handleClick(e, category.acf.category, category.acf.category_name)}
                                activeClassName={s.active}>
                                {category.acf.category_name}
                            </NavLink>
                        </li>
                    )}
                </ul>
            </Sceleton>
        </div>
    )
}

export default Categories
