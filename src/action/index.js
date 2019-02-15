import ActionType from "./ActionType";
import {createAction} from "redux-actions";

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
    let userProfile = {};
    dispatch(setUserToSession(userProfile, true));
}
export const getToken = () => dispatch => {
    dispatch(receiveToken({}));
}

export const getUserFromAPI = (userFMNO, userToken) => dispatch => {

    let userProfile = { };
    dispatch(setUserToSession(userProfile, true));

}

export const setUserToSession = (userProfile, needInit = false) => dispatch => {
    let userProfile = {};
    dispatch(receiveUserProfile(userProfile));
}
