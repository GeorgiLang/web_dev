import React from 'react'
import { Field } from 'redux-form'
import { input } from './inputs'
import { combine, required, length, format } from 'redux-form-validators'
import { useIntl } from 'react-intl'

const InputLastName = ({style, isLabel}) => {

    const intl = useIntl()

    return (
        <Field
            type="text"
            name="last_name"
            style={style}
            isLabel={isLabel}
            autoComplete="lastname"
            component={input}
            placeholder={intl.formatMessage({
                id: "login.last_name",
                defaultMessage: "Фамилия"
            })}
            label={intl.formatMessage({
                id: "login.last_name",
                defaultMessage: "Фамилия"
            })}
            validate={combine(required(),
                length({ min: 2, max: 20 }),
                format({
                    with: /^[А-ЯІЇЄ*-]+$/i,
                    message: "login.only_cyrillic"
                })
            )}
        />
    )
}

export default InputLastName