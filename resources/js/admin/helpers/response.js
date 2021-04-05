import { userActions } from '../actions/user.actions'

export function handleResponse (response) {
    const data = response.data

    return data.data
}
