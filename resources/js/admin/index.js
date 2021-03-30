import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, history } from './helpers'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'

import theme from './assets/theme/theme.js'

import '@fortawesome/fontawesome-free/css/all.min.css'

import AdminLayout from './layouts/Admin.js'
import AuthLayout from './layouts/Auth.js'

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router history={history}>
                <Switch>
                    <Route path="/admin/login" render={(props) => <AuthLayout {...props} />}/>
                    <Route path="/admin" render={props => (
                        localStorage.getItem('user')
                            ? <AdminLayout {...props} />
                            : <Redirect to={{ pathname: '/admin/login' }}/>
                        )}
                    />
                    <Redirect from="/" to="/admin"/>
                </Switch>
            </Router>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
)
