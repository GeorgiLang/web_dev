import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import store from './redux/redux_store'
import { Provider } from 'react-redux'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    
    <BrowserRouter>
        <Provider store={store} >
            <App />
        </Provider>
    </BrowserRouter>, document.getElementById('root')
)

serviceWorker.unregister()
