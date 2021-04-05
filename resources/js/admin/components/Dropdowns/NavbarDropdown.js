import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Hidden from '@material-ui/core/Hidden'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
// @material-ui/icons components
import DirectionsRun from '@material-ui/icons/DirectionsRun'
import EventNote from '@material-ui/icons/EventNote'
import LiveHelp from '@material-ui/icons/LiveHelp'
import Person from '@material-ui/icons/Person'
import Settings from '@material-ui/icons/Settings'

// core components
import componentStyles from '../../assets/theme/components/navbar-dropdown.js'
import { userActions } from '../../actions'
import { history } from '../../helpers'

const useStyles = makeStyles(componentStyles)

export default function NavbarDropdown () {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)
    const dispatch = useDispatch()
    const isMenuOpen = Boolean(anchorEl)
    const user = useSelector(state => state.authentication?.user)
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        dispatch(userActions.logout())
        history.push('/admim/login')
    }

    const menuId = 'primary-search-account-menu'
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Typography
                variant="h6"
                component="h6"
                classes={{ root: classes.menuTitle }}
            >
                Welcome!
            </Typography>
            <Box
                display="flex!important"
                alignItems="center!important"
                component={MenuItem}
                onClick={handleMenuClose}
            >
                <Box
                    component={Person}
                    width="1.25rem!important"
                    height="1.25rem!important"
                    marginRight="1rem"
                />
                <span>My profile</span>
            </Box>
            <Box
                display="flex!important"
                alignItems="center!important"
                component={MenuItem}
                onClick={handleMenuClose}
            >
                <Box
                    component={Settings}
                    width="1.25rem!important"
                    height="1.25rem!important"
                    marginRight="1rem"
                />
                <span>Settings</span>
            </Box>
            <Box
                display="flex!important"
                alignItems="center!important"
                component={MenuItem}
                onClick={handleMenuClose}
            >
                <Box
                    component={EventNote}
                    width="1.25rem!important"
                    height="1.25rem!important"
                    marginRight="1rem"
                />
                <span>Activity</span>
            </Box>
            <Box
                display="flex!important"
                alignItems="center!important"
                component={MenuItem}
                onClick={handleMenuClose}
            >
                <Box
                    component={LiveHelp}
                    width="1.25rem!important"
                    height="1.25rem!important"
                    marginRight="1rem"
                />
                <span>Support</span>
            </Box>
            <Divider component="div" classes={{ root: classes.dividerRoot }}/>
            <Box
                display="flex!important"
                alignItems="center!important"
                component={MenuItem}
                onClick={handleLogout}
            >
                <Box
                    component={DirectionsRun}
                    width="1.25rem!important"
                    height="1.25rem!important"
                    marginRight="1rem"
                />
                <span>Logout</span>
            </Box>
        </Menu>
    )

    return (
        <>
            <Button
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                classes={{
                    label: classes.buttonLabel,
                    root: classes.buttonRoot,
                }}
            >
                <Avatar
                    alt="..."
                    src={require('../../assets/img/theme/team-4-800x800.jpg').default}
                    classes={{
                        root: classes.avatarRoot,
                    }}
                />
                <Hidden smDown>{`${user?.forename} ${user?.surname}`}</Hidden>
            </Button>
            {renderMenu}
        </>
    )
}
