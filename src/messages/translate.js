import React from 'react'
import Validators from 'redux-form-validators'
import { FormattedMessage } from 'react-intl'

export default Validators.formatMessage = msg => {

    return <FormattedMessage {...msg.props || msg} />
}


