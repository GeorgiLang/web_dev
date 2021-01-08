import React from 'react'
import { Field } from 'redux-form'
import { input } from './inputs'
import { combine, length, format } from 'redux-form-validators'
import { useIntl } from 'react-intl'

const InputSecondName = ({style, isLabel}) => {

    const intl = useIntl()

    return (
        <Field
            type="text"
            name="second_name"
            autoComplete="second_name"
            component={input}
            style={style}
            isLabel={isLabel}
            placeholder={intl.formatMessage({
                id: "login.first_name",
                defaultMessage: "Отчество"
            })}
            label={intl.formatMessage({
                id: "login.first_name",
                defaultMessage: "Отчество"
            })}
            validate={combine(
                length({min: 0, max: 20 }),
                format({
                    with: /^$|^[А-ЯІЇЄ*-]+$/i,
                    message: "login.only_cyrillic"
                })
            )}
        />
    )
}

export default InputSecondName