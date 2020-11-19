import React from 'react'
import s from './Popup.module.css'
import { Field } from 'redux-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { file, combine, required, length, acceptance, format } from 'redux-form-validators'
import {
    renderField,
    renderInputWithMask,
    renderTextarea,
    renderInputForFiles,
    renderCheckbox
} from './PopupForm'

const Form = ({
    handleSubmit,
    isDisabled,
    onSubmit }) => {

    const intl = useIntl()

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className={s.input_container1}>
                <Field
                    className={s.input_wrapper}
                    type="text"
                    name="name"
                    component={renderField}
                    placeholder={intl.formatMessage({
                        id: "msg.placeholder_name",
                        defaultMessage: "Пожалуйста, представьтесь"
                    })}
                    validate={combine(required(),
                        length({ min: 2, max: 30 })
                    )}
                />
                <Field
                    className={s.input_wrapper}
                    type="tel"
                    name="tel"
                    component={renderInputWithMask}
                    placeholder={"+__(___)___-__-__"}
                    validate={combine(required(), format({
                        with: new RegExp("\\+[0-9][0-9]\\s\\([0-9][0-9][0-9]\\)\\s[0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]")
                    })
                    )}
                    mask={"+38 (099) 999-99-99"}
                />
                <Field
                    className={s.textarea}
                    name="text"
                    component={renderTextarea}
                    placeholder={intl.formatMessage({
                        id: "msg.placeholder_textarea",
                        defaultMessage: "Расскажите немного о Вашем проекте"
                    })}
                    validate={length({ max: 240 })}
                />
            </div>
            <Field
                type="file"
                name="myfile"
                component={renderInputForFiles}
                value={null}
                validate={file({
                    accept: ".pdf, .zip, .png, .jpg, .jpeg, .html, .css",
                    minSize: "0",
                    maxSize: "10MB",
                    minFiles: 0,
                    maxFiles: 2,
                    allowBlank: true
                })}
                caption={intl.formatMessage({
                    id: "files.selected",
                    defaultMessage: "Файлів вибрано"
                })}
                multiple
            />
            <div className={s.input_container2}>
                <div className={s.check}>
                    <Field
                        className={s.checkbox}
                        type="checkbox"
                        name="checkbox"
                        component={renderCheckbox}
                        validate={acceptance()}
                    />
                    <span>
                        {intl.formatMessage({
                            id: "msg.agree",
                            defaultMessage: "Я згоден на обробку"
                        })}
                        <a target="_blank"
                            rel="nofollow noopener noreferrer"
                            href={intl.formatMessage({
                                id: "msg.link",
                                defaultMessage: "Я згоден на обробку"
                            })}> {intl.formatMessage({
                                id: "msg.link_text",
                                defaultMessage: "персональних даних!"
                            })}
                        </a>
                    </span>
                </div>
                <button className={s.submit} type="submit" disabled={isDisabled}>
                    <FormattedMessage id="msg.submit" />
                </button>
            </div>
        </form>
    )
}

export default Form;