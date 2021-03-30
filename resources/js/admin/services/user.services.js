import axios from 'axios'

export const userService = {
    login,
    logout
}

function login (email, password, remember) {
    const loginForm = {
        email: email,
        password: password,
        remember: remember
    }

    return axios.post(`${process.env.MIX_APP_URL}/api/login`, loginForm)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user))

            return user
        })
}

function logout () {
    localStorage.removeItem('user')
}

function handleResponse (response) {
    const data = response.data
    if (!data.success) {
        if (response.status === 401) {
            logout()
            location.reload(true)
        }

        const error = (data && data.error)
        return Promise.reject(error)
    }

    return data
}
