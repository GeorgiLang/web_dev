import React from 'react'
import { Field } from 'redux-form'
import { inputMask } from './inputs'
import { combine, required, format } from 'redux-form-validators'
import { useIntl } from 'react-intl'
import '../../messages/translate'

const InputTel = ({tel, style, isLabel}) => {

    const intl = useIntl()

    return (
        <Field
                type="tel"
                name="tel"
                style={style}
                isLabel={isLabel}
                component={inputMask}
                placeholder={"+__(___)___-__-__"}
                label={intl.formatMessage({
                    id: "login.phone",
                    defaultMessage: "Phone number"
                })}
                validate={combine(required(), format({
                    with: new RegExp("\\+[0-9][0-9]\\s\\([0-9][0-9][0-9]\\)\\s[0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]")
                })
                )}
                tel={tel}
                mask={"+38 (099) 999-99-99"}
            />
    )
}

export default InputTel