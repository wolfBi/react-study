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

export const showNoticeMsg = createAction(ActionType.showNoticeMsg);
export const closeNotice = createAction(ActionType.closeNotice);
export const changeApplicationMenu = createAction(ActionType.change_ApplicationMenu);

export const autoLogin = () => dispatch => {
    dispatch(setUserToSession(userProfile, true));
}
export const getToken = () => dispatch => {
    dispatch(receiveToken(json));
}

export const getUserFromAPI = (userFMNO, userToken) => dispatch => {

    let userProfile = { };
    dispatch(setUserToSession(userProfile, true));

}

export const setUserToSession = (userProfile, needInit = false) => dispatch => {
    dispatch(receiveUserProfile(userProfile));
}
