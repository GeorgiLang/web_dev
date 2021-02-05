import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import store from './redux/redux_store'
import { Provider } from 'react-redux'
import App from './App'
import { BrowserRouter, Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'

ReactDOM.render(
    
    <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={Route}>
            <Provider store={store} >
                <App />
            </Provider>
        </QueryParamProvider>
    </BrowserRouter>, document.getElementById('root')
)

serviceWorker.unregister()
