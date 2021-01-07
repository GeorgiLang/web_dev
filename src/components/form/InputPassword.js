import React from 'react'
import { Field } from 'redux-form'
import { input } from './inputs'
import { combine, format, length } from 'redux-form-validators'
import { useIntl } from 'react-intl'
import '../../messages/translate'

const InputPassword = ({style, isLabel}) => {

    const intl = useIntl()

    return (
        <Field
            type="password"
            name="password"
            autoComplete="current-password"
            component={input}
            style={style}
            isLabel={isLabel}
            placeholder={intl.formatMessage({
                id: "login.password",
                defaultMessage: "Password"
            })}
            label={intl.formatMessage({
                id: "login.password",
                defaultMessage: "Password"
            })}
            validate={combine(length({ min: 6, max: 20 }),
                format({
                    with: /^[a-zA-Z1-9!@]+$/i,
                    message: intl.formatMessage({
                        id: "login.warning_password",
                        defaultMessage: "Пароль повинен містити цифри і латинські букви і не повинен збігатися з ім'ям і email"
                    })
                }))}
        />
    )
}

export default InputPassword