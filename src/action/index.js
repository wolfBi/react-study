/**
 * Created by zhou on 2017/6/10.
 */
import React from "react";
import ReactDOM from "react-dom";
import ActionType from "./ActionType";
import LoginFailed from "../component/LoginFailed";
import {createAction} from "redux-actions";
import {CommonUtil, HttpUtil} from "../utils";

export const startAjax = createAction(ActionType.startAjaxType);
export const endAjax = createAction(ActionType.endAjaxType);
export const receiveToken = createAction(ActionType.receive_token);
export const userStartLogin = createAction(ActionType.user_start_login);
export const userEndLogin = createAction(ActionType.user_end_login);
export const receiveUserProfile = createAction(ActionType.receive_user_profile);

export const showOSMNoticeMsg = createAction(ActionType.showOSMNoticeMsg);
export const closeOSMNotice = createAction(ActionType.closeOSMNotice);
export const changeApplicationMenu = createAction(ActionType.change_ApplicationMenu);

export const autoLogin = () => dispatch => {
    let loginFMNO = CommonUtil.getURLQueryString("fmno");
    if (!loginFMNO || loginFMNO === "") {
        let loginUrl = window.global['LOGIN_URL'];
        dispatch(userStartLogin());
        return HttpUtil.get(loginUrl, {}, dispatch, true, true, {}, true).then(json => {
            dispatch(userEndLogin());
            let userProfile = {fmno: json.fmno, name: json.name, email: json.email};

            dispatch(setUserToSession(userProfile, true));
        }, () => {
            dispatch(userEndLogin());
            let defaultUser = window.global['LOGIN_ERROR_SET_DEFAULT_USER'];
            if (!CommonUtil.isEmpty(defaultUser) && defaultUser.indexOf(",") > 0) {
                defaultUser = defaultUser.split(',');
                let userFMNO = defaultUser[0] || '';
                let userName = defaultUser[1] || '';
                let userEmail = defaultUser[2] || '';
                let userProfile = {fmno: userFMNO, name: userName, email: userEmail};
                dispatch(setUserToSession(userProfile, true));
            } else {
                ReactDOM.render(<LoginFailed />, document.getElementById('root'));
            }
        })
    }
}
export const getToken = () => dispatch => {
    let url = "/mckapi/token";
    return HttpUtil.get(url, {}, dispatch).then(json => {
        dispatch(receiveToken(json));
        let loginFMNO = CommonUtil.getURLQueryString("fmno");
        if (loginFMNO && loginFMNO !== "") {
            dispatch(getUserFromAPI(loginFMNO, json));
        }
    });
}

export const getUserFromAPI = (userFMNO, userToken) => dispatch => {
    let urlBase = window.global['MCK_API_BASE']
    let urlAPI = "/v3/persons?q=*&fields=core.fmno,core.firstName,core.lastName,contact.emails?emailAddress&core.fmno=" + userFMNO;
    dispatch(userStartLogin());
    HttpUtil.get(urlBase + urlAPI, {}, dispatch, true, true, {'Authorization': `${userToken.token_type} ` + userToken.access_token}).then(json => {
        dispatch(userEndLogin());
        if (json && json.response && json.response.persons) {
            let person = json.response.persons[0];
            let userProfile = {
                fmno: person.core.fmno,
                name: person.core.firstName + ' ' + person.core.lastName,
                email: person.contact && person.contact.emails && person.contact.emails[0].emailAddress
            };
            dispatch(setUserToSession(userProfile, true));
        }
    }, () => {
        dispatch(userEndLogin());
        console.log('getUserPorfile error')
    })
}

export const setUserToSession = (userProfile, needInit = false) => dispatch => {
    if (userProfile.fmno.length === 3) {
        userProfile.fmno = "00" + userProfile.fmno
    } else if (userProfile.fmno.length === 4) {
        userProfile.fmno = "0" + userProfile.fmno
    }
    dispatch(receiveUserProfile(userProfile));
}
