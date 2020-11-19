import React from 'react'
import Validators from 'redux-form-validators'
import { FormattedMessage } from 'react-intl'

Validators.formatMessage = msg => {

    return <FormattedMessage {...msg.props || msg} />
}

export default (id, value={}) => <FormattedMessage id={id} values={{...value}} />;

