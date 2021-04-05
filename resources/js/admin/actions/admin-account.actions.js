import { adminAccountConstants } from '../constants'
import { adminAccountServices } from '../services'

export const adminAccountActions = {
    getAll
}

function getAll () {
    return dispatch => {
        dispatch(request())

        adminAccountServices.getAll()
            .then(
                adminAccounts => dispatch(success(adminAccounts)),
                error => dispatch(failure(error))
            )
    }
    function request() { return { type: adminAccountConstants.GETALL_REQUEST } }
    function success(adminAccounts) { return { type: adminAccountConstants.GETALL_SUCCESS, adminAccounts } }
    function failure(error) { return { type: adminAccountConstants.GETALL_FAILURE, error } }
}
