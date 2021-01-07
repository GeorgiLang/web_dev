import React from 'react'
import { Field } from 'redux-form'
import { input } from './inputs'
import { email } from 'redux-form-validators'
import { useIntl } from 'react-intl'
import '../../messages/translate'

const InputEmail = ({style, isLabel}) => {

    const intl = useIntl()

    return (
        <Field
            type="email"
            name="email"
            style={style}
            isLabel={isLabel}
            autoComplete="email"
            component={input}
            placeholder={intl.formatMessage({
                id: "login.email",
                defaultMessage: "E-mail"
            })}
            label={intl.formatMessage({
                id: "login.email",
                defaultMessage: "E-mail"
            })}
            validate={email()}
        />
    )
}

export default InputEmail