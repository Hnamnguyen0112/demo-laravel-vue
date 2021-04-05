import Dashboard from './pages/Dashboard.js'
import Login from './pages/Login.js'
import ProfileManagement from './pages/ProfileManagement'
import BlogManagement from './pages/BlogManagement'
import Tv from '@material-ui/icons/Tv'
import VpnKey from '@material-ui/icons/VpnKey'
import Grain from '@material-ui/icons/Grain'
import Palette from '@material-ui/icons/Palette'
import AccessibilityIcon from '@material-ui/icons/Accessibility'
import AdminAccountManagement from './pages/AdminAccountManagement'

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
        path: '/admin-management',
        name: 'Admin Management',
        icon: AccessibilityIcon,
        iconColor: 'Primary',
        component: AdminAccountManagement,
        layout: '/admin',
    },
    {
        path: '/profile-management',
        name: 'Profile Management',
        icon: Grain,
        iconColor: 'Primary',
        component: ProfileManagement,
        layout: '/admin',
    },
    {
        path: '/blog-management',
        name: 'Blog Management',
        icon: Palette,
        iconColor: 'Primary',
        component: BlogManagement,
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
