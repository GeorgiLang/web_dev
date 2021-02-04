import React from "react"
import s from './Common.module.css'

const ScrollToTop = ({ isVisible, scrollToTop }) => {


    return (
        <button disabled={isVisible ? false : true} onClick={scrollToTop} className={`${s.scroll_to_top} ${!isVisible ? s.hidden : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="42" height="42" viewBox="0 0 512 512">
                <path d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm231-113.9L103.5 277.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L256 226.9l101.6 101.6c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L273 142.1c-9.4-9.4-24.6-9.4-34 0z"></path>
            </svg>
        </button>
    )
}

export default ScrollToTop