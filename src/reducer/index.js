/**
 * Created by zhou on 2017/6/10.
 */
import ActionType from "../action/ActionType";
import {combineReducers} from "redux";
import {filterActions} from "redux-ignore";
import {handleActions} from 'redux-actions'
import * as actions from '../action';

const ajaxInitState = {
    isLoading: false,
    message: 'Loading...'
}
export const ajaxReducer = (state = ajaxInitState, action) => {
    switch (action.type) {
        case ActionType.startAjaxType:
            return {...state, isLoading: true, message: action.payload}
        case ActionType.endAjaxType:
            return {...state, isLoading: false, message: ''}
        default:
            return state;
    }
}

const user = handleActions({
    [actions.userStartLogin]: (state, action) => ({
        ...state,
        isLogining: true
    }),
    [actions.userEndLogin]: (state, action) => ({
        ...state,
        isLogining: false
    }),
    [actions.receiveToken]: (state, action) => ({
        ...state,
        token: action.payload
    }),
    [actions.receiveUserProfile]: (state, action) => ({
        ...state,
        userProfile: action.payload
    }),
}, {
    isLogining: false, token: {access_token: "", expires_in: "", token_type: ""},
    userProfile: {fmno: '', name: '', email: '', active: ''}
});

const notice = handleActions({
    [actions.showOSMNoticeMsg]: (state, action) => ({
        message: action.payload
    }),
    [actions.closeOSMNotice]: (state, action) => ({
        message: ''
    })
}, {message: ''});

const application = handleActions({
    [actions.changeApplicationMenu]: (state, action) => ({
        ...state,
        ...action.payload
    })
}, {});

export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        ajax: filterActions(ajaxReducer, [ActionType.startAjaxType, ActionType.endAjaxType]),
        user: user,
        application: application,
        notice,
        ...asyncReducers
    });
}

export const injectReducer = (store, {key, reducer}) => {
    if (Object.hasOwnProperty.call(store.asyncReducers, key)) return
    store.asyncReducers[key] = reducer;
    store.replaceReducer(makeRootReducer(store.asyncReducers));
}