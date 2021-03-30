import Dashboard from './pages/Dashboard.js'
import Login from './pages/Login.js'
import Tv from '@material-ui/icons/Tv'
import VpnKey from '@material-ui/icons/VpnKey'

var routes = [
    {
        path: '/',
        name: 'Dashboard',
        icon: Tv,
        iconColor: 'Primary',
        component: Dashboard,
        layout: '/admin',
    },
    {
        path: '/',
        name: 'Login',
        icon: VpnKey,
        iconColor: 'Info',
        component: Login,
        layout: '/admin/login',
    }
]
export default routes
