import React from 'react'
import s from './Common.module.css'

const Sceleton = ({ className, isLoading, isSwipe, background = "rgb(222, 222, 222, 222)", children}) => {

    return (
        <div className={className}
            style={{ backgroundColor: isLoading ? background : ""}}>
            {isLoading ? <div className={s.background_preloader}></div> : isSwipe ? null : children}
            {isSwipe ? children : null}
        </div>
    )
}

export default Sceleton