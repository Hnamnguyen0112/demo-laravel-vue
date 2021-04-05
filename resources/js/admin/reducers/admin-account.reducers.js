import { adminAccountConstants } from '../constants'

export function adminAccounts (state = {}, action) {
    switch (action.type) {
        case adminAccountConstants.GETALL_REQUEST:
            return {
                loading: true
            }
        case adminAccountConstants.GETALL_SUCCESS:
            return action.adminAccounts
        case adminAccountConstants.GETALL_FAILURE:
            return {
                error: action.error
            }
        default:
            return state
    }
}
