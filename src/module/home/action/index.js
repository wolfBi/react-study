import {createAction} from 'redux-actions'
import ActionType from './ActionType'

export const advancedSearch = createAction(ActionType.setAdvancedSearchCondition);