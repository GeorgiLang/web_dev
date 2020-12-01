import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import store from './redux/redux_store'
import { Provider } from 'react-redux'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { IntlProvider } from 'react-intl'

ReactDOM.render(
    <BrowserRouter>
        <IntlProvider locale={navigator.language}>
            <Provider store={store} >
                <App />
            </Provider>
        </IntlProvider>
    </BrowserRouter>, document.getElementById('root')
);

serviceWorker.register()
