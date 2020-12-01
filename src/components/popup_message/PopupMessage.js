import React from 'react'
import s from './PopupMessage.module.css'
import { FormattedMessage } from 'react-intl'

const PopupMessage = ({popup_message, deletePopup}) => {

    let message = "login.wait"
    message = popup_message

    return (
        <div className={s.container}>
            <div className={s.container_message}>
                <p><FormattedMessage
                        id={message}
                        defaultMessage="Продолжить покупки" />
                </p>
                <svg className={s.delete_popup} onClick={deletePopup} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                    <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
                </svg>
            </div>
        </div>
    )
}

export default PopupMessage