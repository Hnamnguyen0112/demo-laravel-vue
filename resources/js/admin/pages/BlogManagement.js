import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'

import Header from '../components/Headers/Header.js'
import componentStyles from '../assets/theme/pages/blog-management.js'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles(componentStyles)

function BlogManagement () {
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
                <Grid container component={Box} marginBottom="39px">
                    <Grid item xs={12}>
                        <Card classes={{ root: classes.cardRoot }}>
                            <CardHeader
                                className={classes.cardHeader}
                                title="Blog Management"
                                titleTypographyProps={{
                                    component: Box,
                                    marginBottom: '0!important',
                                    variant: 'h3',
                                }}
                            />
                            <CardContent>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default BlogManagement
