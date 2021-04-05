import { combineReducers } from 'redux'
import { authentication } from './authentication.reducers'
import { adminAccounts } from './admin-account.reducers'

const rootReducer = combineReducers({
    authentication,
    adminAccounts
})

export default rootReducer
