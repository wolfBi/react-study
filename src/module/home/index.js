import {filterActions} from 'redux-ignore';
import {injectReducer} from '../../reducer';
import reducer from './reducer';
import ActionType from './action/ActionType';


export const loadReducer = (store) => {
    injectReducer(store, {
        key: "home",
        reducer: filterActions(reducer, action => action.type.indexOf(ActionType.actionKey) > -1)
    });
}