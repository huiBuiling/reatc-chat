import React from 'react';
import ReactDOM from 'react-dom';

// import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import App from './App';
import { counter , addPro, delPro, addProAsync} from "./compontents/index.redux";

const store = createStore(counter,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension():f=>f
))

function render() {
    // ReactDOM.render(<App store={store}/>, document.getElementById('root'));
    ReactDOM.render(
            <App
                store={store}
                addPro={addPro}
                delPro={delPro}
                addProAsync={addProAsync}
            />, document.getElementById('root'));
}
// registerServiceWorker();
render();

//订阅
store.subscribe(render)