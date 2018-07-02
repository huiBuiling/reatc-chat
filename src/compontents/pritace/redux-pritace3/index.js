import React from 'react';
import ReactDOM from 'react-dom';

// import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import App from './App';
import { counter } from "./compontents/index.redux";

const store = createStore(counter,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension():f=>f
))

function render() {
    // ReactDOM.render(<App store={store}/>, document.getElementById('root'));
    ReactDOM.render(
        (<Provider store={store}>
            <App />
        </Provider>), document.getElementById('root'));
}
// registerServiceWorker();
render();

//订阅
store.subscribe(render)
