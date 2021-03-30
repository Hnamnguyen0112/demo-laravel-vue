import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'

import Header from '../components/Headers/Header.js'
import componentStyles from '../assets/theme/pages/profile-management.js'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(componentStyles)

function ProfileManagement () {
    const classes = useStyles()
    const theme = useTheme()
    return (
        <>
            <Header/>
            <Container
                maxWidth={false}
                component={Box}
                marginTop="-6rem"
                classes={{ root: classes.containerRoot }}
            >
                <Grid container>

                </Grid>
            </Container>
        </>
    )
}

export default ProfileManagement
