import {applyMiddleware, createStore as createStoreRedux} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {makeRootReducer} from '../reducer';

const createStore = () => {
    const middleware = [thunk];
    if (window.__DEV__) {
        middleware.push(logger);
    }
    const store = createStoreRedux(makeRootReducer(), applyMiddleware(...middleware));
    store.asyncReducers = {};
    return store;
}

export default createStore;