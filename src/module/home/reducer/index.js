import ActionType from '../action/ActionType';
import {combineReducers} from 'redux'

const advancedSearch = (condition = {}, action) => {
    switch (action.type) {
        case ActionType.setAdvancedSearchCondition:
            return action.payload;
        default:
            return condition;
    }
}

const reducer = combineReducers({
    advancedSearch
})

export default reducer;