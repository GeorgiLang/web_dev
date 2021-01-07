import React from 'react'
import { Field } from 'redux-form'
import { input } from './inputs'
import { combine, required, length, format } from 'redux-form-validators'
import { useIntl } from 'react-intl'
import '../../messages/translate'

const InputFirstName = ({style, isLabel}) => {

    const intl = useIntl()

    return (
        <Field
            type="text"
            name={"first_name"}
            autoComplete="firstname"
            component={input}
            style={style}
            isLabel={isLabel}
            placeholder={intl.formatMessage({
                id: "login.first_name",
                defaultMessage: "Имя"
            })}
            label={intl.formatMessage({
                id: "login.first_name",
                defaultMessage: "Имя"
            })}
            validate={combine(required(),
                length({ min: 2, max: 20 }),
                format({
                    with: /^[А-ЯІЇЄ*-]+$/i,
                    message: intl.formatMessage({
                        id: "login.only_cyrillic",
                        defaultMessage: "Введите ваши данные кирилицей"
                    })
                })
            )}
        />
    )
}

export default InputFirstName