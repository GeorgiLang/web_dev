import React, { useEffect } from 'react'
import s from './Shop.module.css'
import { useSelector, useDispatch } from 'react-redux'
import Cards from './Cards'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { setPageThunk } from '../../redux/cards_functions'
import { searchThunk, searchExactThunk } from '../../redux/search_reducer'
import '../../messages/translate'
import SideBar from '../sidebar/SideBar'
import FullCardContainer from '../fullcard/FullCardContainer'
import { categoryNameAC } from '../../redux/cards_reduсer'


const Shop = ({ container, scrollToTop }) => {

    let match = useRouteMatch({
        path: '/shop/:category/fullcard/:id/:id',
        strict: true,
        sensitive: true
      })

    const cards = useSelector(state => state.cards.cards)
    const category_name = useSelector(state => state.cards.category_name)
    const categories = useSelector(state => state.cards.categories)
    const isSearch = useSelector(state => state.search.isSearch)
   
    const {
        per_page,
        isLoading,
        isDisabled,
        total_cards,
        purchase,
        category,
        current_page } = useSelector(state => state.cards)
    const filter = useSelector(state => state.cards.filter)
    
    const dispatch = useDispatch()
    let history = useHistory()
    let location = useLocation()

    let path = location.pathname.split('/')
    let _category = path[2]
    let full_card = path[3]

    const searchParam = new URLSearchParams(location.search)
    const search_category = searchParam.get('category')
    const _category_name = searchParam.get('category_name')
    const search_name = searchParam.get('search')
    const _search_name = searchParam.get('search_name')
    const search_exact = searchParam.get('exact')
    const _filter = searchParam.get('filter')


    useEffect(() => {

        if (search_name) {
            dispatch(searchThunk(search_name))
        } else if (search_exact) {
            dispatch(searchExactThunk(search_category, search_exact))
        }

    }, [search_name, search_exact, search_category, _category_name])

    useEffect(() => {

        scrollToTop()
    }, [isSearch])

    useEffect(() => {

        let pathname = sessionStorage.getItem('pathname')
        let search =  sessionStorage.getItem('search')

        if (pathname && search && !full_card) {
            history.push({
                pathname: pathname,
                search: search
            })
        }
    }, [])

    useEffect(() => {

        sessionStorage.removeItem('pathname')
        sessionStorage.removeItem('search')
        sessionStorage.setItem('pathname', location.pathname)
        sessionStorage.setItem('search', location.search) 
 
    }, [location.pathname, location.search])

    useEffect(() => {

        for (let i = 0; i < categories.length; i++) {

            if (categories[i].acf.category === _category) {

                dispatch(categoryNameAC(categories[i].acf.category_name)) 
            }
        }
    }, [_category])

    let total_pages = Math.ceil(total_cards / per_page)

    const setFilter = value => {

        history.push({
            pathname: `/shop/${_category}`,
            search: `?page=1&filter=${value}&category_name=${category_name}${_search_name ? `&search_name=${_search_name}` : ''}`
        })
    }
    const setPage = (page, pageName, top_pagination) => {

        dispatch(setPageThunk(page, pageName, top_pagination))

        history.push({
            pathname: `/shop/${_category}`,
            search: `?page=${page}&filter=${_filter}&category=${category}&category_name=${category_name}${_search_name ? `&search_name=${_search_name}` : ''}`
        })
    }
    const Pagination = ({ top_pagination }) => {

        let buttons = []

        for (let i = 0; i < total_pages; i++) {

            buttons.push(

                <button
                    key={i + 1}
                    onClick={() => setPage(i + 1, 'pages', top_pagination)}
                    disabled={isDisabled || isLoading || current_page === i + 1}
                    className={`${s.more} ${current_page === i + 1 ? s.active : ''}`}>
                    {i + 1}
                </button>)
        }
        return (
            <div className={s.wrapper_button}>
                <button onClick={() => setPage(current_page - 1, 'prev', top_pagination)}
                    disabled={isDisabled || isLoading || current_page === 1 || total_pages < 2}
                    className={`${s.more} ${current_page === 1 ? s.disabled : ''}`} >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" />
                    </svg>
                </button>
                {total_pages > 1 ? buttons : null}
                <button onClick={() => setPage(current_page + 1, 'next', top_pagination)}
                    disabled={isDisabled || isLoading || current_page === total_pages || total_pages < 2}
                    className={`${s.more} ${current_page === total_pages ? s.disabled : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
                    </svg>
                </button>
            </div>
        )
    }
    const Select = () => {

        return (
            <div className={s.select}>
                <select onChange={e => setFilter(e.target.value)} defaultValue={_filter}>
                    <option value="relevant">Relevant</option>
                    <option value="priceUp">Price up</option>
                    <option value="priceDown">Price down</option>
                    <option value="A-Z">Product's name A-Z</option>
                    <option value="Z-A">Product's name Z-A</option>
                </select>
            </div>
        )
    }
    return (
        !match ? <div className={s.cards_container}>
            <SideBar className={s.sidebar} />
            {!isSearch ? <div className={s.cards}>
                {cards.length !== 0 && _category || (search_category && search_exact) ? <Select /> : null}
                {cards.length !== 0 && (_category || (search_category && search_exact)) ? <Pagination top_pagination={true} /> : null}
                {_category || (search_category && search_exact) ? <Cards
                    cards={cards}
                    current_page={current_page}
                    container={container}
                    category_name={category_name}
                    isLoading={isLoading}
                    category={category}
                    filter={filter}
                    purchase={purchase} /> : <div className={s.banner}><p>Banner</p></div>}
                {cards.length !== 0 && (_category || (search_category && search_exact)) ? <Pagination top_pagination={false} /> : null}
            </div> : <div className={s.banner}><p>Banner</p></div>}
        </div> : <FullCardContainer categories={categories} scrollToTop={scrollToTop} />
    )
}

export default React.memo(Shop)