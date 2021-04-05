import { authHeader, handleException, handleResponse } from '../helpers'
import axios from 'axios'

export const adminAccountServices = {
    getAll
}

function getAll () {
    return axios.get(`${process.env.MIX_APP_URL}/api/admin`, { headers: authHeader() })
        .then(handleResponse)
}
