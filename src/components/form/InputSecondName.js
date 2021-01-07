import React from 'react'
import { Field } from 'redux-form'
import { input } from './inputs'
import { combine, length, format } from 'redux-form-validators'
import { useIntl } from 'react-intl'
import '../../messages/translate'

const InputSecondName = ({style, isLabel}) => {

    const intl = useIntl()

    return (
        <Field
            type="text"
            name="second_name"
            style={style}
            isLabel={isLabel}
            autoComplete="secondname"
            component={input}
            placeholder={intl.formatMessage({
                id: "login.second_name",
                defaultMessage: "Отчество"
            })}
            label={intl.formatMessage({
                id: "login.second_name",
                defaultMessage: "Отчество"
            })}
            validate={combine(format({
                    with: /^$|^[А-ЯІЇЄ*-]+$/i,
                    message: intl.formatMessage({
                        id: "login.only_cyrillic",
                        defaultMessage: "Введите ваши данные кирилицей"
                    })
                }),length({min: 0, max: 20 })
            )}
        />
    )
}

export default InputSecondName