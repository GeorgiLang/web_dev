import React from 'react'
import s from './Popup.module.css'
import PopupForm from './PopupForm.js'
import { connect } from 'react-redux'
import { consultAC } from '../../redux/consult_reducer'
import { localeAC } from '../../redux/locale_reducer'
import { FormattedMessage } from 'react-intl'
import Preloader from '../../common/Preloader'
import { popupAC, preloaderAC } from '../../redux/consult_reducer'
import { Link } from 'react-router-dom'
import Language from '../language/Language'

const Popup = ({
    popup,
    isMessage,
    setLocale,
    messageID,
    preloader
}) => {

    return (
        <div onClick={popup ? isMessage : null} className={s.base}>
            <div className={s.consult}>
                <Language className={s.language} setLanguage={setLocale}/>
                <Link className={s.btn_remove} to="/"></Link>
                {preloader ? <Preloader className={s.preloader} size="50px" /> : null}
                <div className={s.container}>
                    <div className={s.header}>
                        <h2>
                            <FormattedMessage
                                id="msg.title"
                                defaultMessage="С радостью обсудим вашу идею!" />
                        </h2>
                        <span>
                            <FormattedMessage
                                id="msg.subtitle"
                                defaultMessage="Просто расскажите о своих задумках, а мы придумаем, как их воплотить!" />
                        </span>
                    </div>
                    <PopupForm />
                </div>
                <div className={`${s.popup} ${popup ? s.popup_active : null}`}>
                    <p>
                        <FormattedMessage
                            id={messageID}
                            defaultMessage="От халепа!" />
                    </p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {

    return {
        preloader: state.consult.preloader,
        popup: state.consult.popup,
        messageID: state.consult.messageID
    }
}

const mapDispatchToProps = dispatch => {

    return {
        isHidden: () => {
            dispatch(consultAC(false))
            dispatch(preloaderAC(false))
        },
        setLocale: locale => dispatch(localeAC(locale)),
        isMessage: () => dispatch(popupAC(false))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
