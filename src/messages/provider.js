import React  from 'react';
import { IntlProvider } from 'react-intl';
import messages from '.';

const initial = {}

const Provider = ({ locale = initial, children }) => (

    <IntlProvider
        locale={locale}
        messages={messages[locale]}>
        {children}
    </IntlProvider>
)

export default Provider;