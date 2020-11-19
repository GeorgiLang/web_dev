import React, { useEffect } from 'react'
import file_icon from '../../img/file.png'
import s from './Popup.module.css'
import { reduxForm } from "redux-form"
import { connect } from 'react-redux'
import Inputmask from 'react-input-mask'
import { Scrollbars } from 'react-custom-scrollbars'
import { FormattedMessage } from 'react-intl'
import Form from './Form'
import { sendMessageThunk } from '../../redux/consult_reduser'
import { linePreloaderAC } from '../../redux/preloader_reduser'
import '../../messages/translate'

export const hint = (touched, error, active, valid) => {

    if (touched && !active && error) {
        return s.error;
    } else if (active) {
        return s.active
    } if (valid)
        return s.completed
}

export const renderField = ({
    input,
    className,
    placeholder,
    type,
    value,
    meta: { touched,
        error,
        active,
        valid,
        warning } }) => {

    return (
        <div className={`${className} ${hint(touched, error, active, valid)}`}>

            {touched && ((error && <p className={s.hint}>{error}</p>)
                || (warning && <p className={s.hint}>{warning}</p>))}
            <input
                {...input}
                type={type}
                placeholder={placeholder}
                value={value}
            />
        </div>
    )
}

export const renderInputWithMask = ({
    input,
    className,
    placeholder,
    type,
    value,
    mask,
    meta: { touched,
        error,
        active,
        valid,
        warning } }) => {

    return (
        <div className={`${className} ${hint(touched, error, active, valid)}`}>

            {touched && ((error && <p className={s.hint}>{error}</p>)
                || (warning && <p className={s.hint}>{warning}</p>))}
            <Inputmask
                {...input}
                type={type}
                placeholder={placeholder}
                value={value}
                mask={mask}
            />
        </div>
    )
}

export const renderCheckbox = ({
    input,
    type,
    meta: { touched,
        error,
        active,
        valid } }) => {
    return (
        <><label className={`${s.check_border} ${valid ? s.check_active : null} ${(touched && !active && error) ? s.error : null}`}>
            <input
                {...input}
                type={type} />
        </label>
            {touched && (error && <p className={s.hint}>{error}</p>)}</>
    )
}

export const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
        borderRadius: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

export const CustomScrollbars = props => (
    <Scrollbars
        renderThumbHorizontal={renderThumb}
        renderThumbVertical={renderThumb}
        {...props}
    />
);
/*----------------------------set height of textarea-----------------------*/
export const handleKeyDown = e => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
}
/*--------------------------------------------------------------------------*/
export const renderTextarea = ({
    input,
    className,
    type,
    placeholder,
    meta: {
        touched,
        error,
        active,
        warning } }) => {
    return (
        <div className={`${className} ${active ? s.active : null}`}>
            {touched && ((error && <p className={s.hint}>{error}</p>)
                || (warning && <p className={s.hint}>{warning}</p>))}
            <CustomScrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
                <textarea
                    onKeyDown={handleKeyDown}
                    {...input}
                    type={type}
                    placeholder={placeholder}
                ></textarea>
            </CustomScrollbars>
        </div>
    )
}
/*----------------------------------set quanty files-----------------------------*/

export const files = (input, caption) => {

    if (input.value) {
        let quantyFiles = input.value.length
        if (quantyFiles === 1) {
            return input.value[0].name
        } else if (quantyFiles > 1) {
            return `${quantyFiles} ${caption}`
        }
    } else {
        return null
    }
}
/*-------------------------------------------------------------------------------*/
export const renderInputForFiles = ({
    input,
    placeholder,
    type,
    value,
    multiple,
    caption,
    meta: {
        touched,
        error } }) => {

    return (

        <div className={s.inputfile_label}>
            <label>
                <input
                    {...input}
                    className={s.inputfile}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    multiple={multiple}
                />
                <p><img src={file_icon} alt="file_icon" />
                    <FormattedMessage id="msg.attach_file" defaultMessage="Прикрепить файл" />
                </p>
            </label>
            {error && touched
                ? <span className={s.hint}>{error}</span>
                : <span className={s.qty_files}>{files(input, caption)}</span>}
        </div>
    )
}

const MessageReduxForm = reduxForm({
    form: 'sendMessage'
})(Form)

const Send = ({
    submit,
    linePreloader,
    isDisabled
}) => {

    const onSubmit = values => {
        submit(values)
    }
    useEffect(() => {

        linePreloader()
    }, [])


    return (
        <MessageReduxForm onSubmit={onSubmit} isDisabled={isDisabled} />
    )
}

const marStateToProps = state => {

    return {
        isDisabled: state.consult.isDisabled
    }
}

const mapDispatchToProps = dispatch => {

    return {
        submit: values => dispatch(sendMessageThunk(values)),
        linePreloader: () => dispatch(linePreloaderAC(false))
    }
}

export default connect(marStateToProps, mapDispatchToProps)(Send);
