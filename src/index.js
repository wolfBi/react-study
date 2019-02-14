import React from 'react';
import ReactDOM from 'react-dom';
import App from './module/app/App';
import LogUtil from "./utils/LogUtil";
import LoginFailed from "./component/LoginFailed";
import createStore from "./store/createStore";
import * as serviceWorker from './serviceWorker';
import './index.css';
async function start() {
    console.log("App start ")
    try {
        let store = createStore();
        ReactDOM.render(<App store={store}/>, document.getElementById('root'));

        // If you want your app to work offline and load faster, you can change
        // unregister() to register() below. Note this comes with some pitfalls.
        // Learn more about service workers: http://bit.ly/CRA-PWA
        serviceWorker.unregister();
    } catch (e) {
        LogUtil.error('index error', e)
        ReactDOM.render(<LoginFailed />, document.getElementById('root'));
    }
}
start().then(() => {
    LogUtil.info("App Client started!")
});