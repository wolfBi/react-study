/**
 * Created by zhou on 2017/6/11.
 */
import {createAction} from 'redux-actions'
import ActionType from './ActionType'

export const advancedSearch = createAction(ActionType.setAdvancedSearchCondition);