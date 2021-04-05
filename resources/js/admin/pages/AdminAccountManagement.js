import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'

import Header from '../components/Headers/Header.js'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import Button from '@material-ui/core/Button'

import componentStyles from '../assets/theme/pages/admin-account-management.js'

const useStyles = makeStyles(componentStyles)

import { adminAccountActions } from '../actions'

function AdminAccountManagement () {
    const classes = useStyles()
    const theme = useTheme()
    const dispatch = useDispatch()
    const adminAccounts = useSelector(state => state.adminAccounts)

    useEffect(() => {
        dispatch(adminAccountActions.getAll())
    }, [])

    const renderAdminAccounts = () => {
        if (Array.isArray(adminAccounts)) {
            return adminAccounts.map(({ id, forename, surname, email, created_at }) => (
                <TableRow key={id}>
                    <TableCell
                        classes={{ root: classes.tableCellRoot + ' ' + classes.tableCellRootHead, }}
                    >
                        {id}
                    </TableCell>
                    <TableCell
                        classes={{ root: classes.tableCellRoot + ' ' + classes.tableCellRootHead, }}
                    >
                        {forename}
                    </TableCell>
                    <TableCell
                        classes={{ root: classes.tableCellRoot + ' ' + classes.tableCellRootHead, }}
                    >
                        {surname}
                    </TableCell>
                    <TableCell
                        classes={{ root: classes.tableCellRoot + ' ' + classes.tableCellRootHead, }}
                    >
                        {email}
                    </TableCell>
                    <TableCell
                        classes={{ root: classes.tableCellRoot + ' ' + classes.tableCellRootHead, }}
                    >
                        {moment(created_at).toISOString()}
                    </TableCell>
                    <TableCell
                        classes={{ root: classes.tableCellRoot + ' ' + classes.tableCellRootHead, }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            component={Box}
                            marginRight="1rem!important"
                        >
                            View
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                        >
                            Delete
                        </Button>
                    </TableCell>
                </TableRow>
            ))
        }
    }

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
                                title="Admin Management"
                                titleTypographyProps={{
                                    component: Box,
                                    marginBottom: '0!important',
                                    variant: 'h3',
                                }}
                            />
                            <CardContent>
                                <TableContainer>
                                    <Box
                                        component={Table}
                                        alignItems="center"
                                        marginBottom="0!important"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell
                                                    classes={{ root: classes.tableCellRoot + ' ' + classes.tableCellRootHead, }}
                                                >
                                                    ID
                                                </TableCell>
                                                <TableCell
                                                    classes={{ root: classes.tableCellRoot + ' ' + classes.tableCellRootHead, }}
                                                >
                                                    Forename
                                                </TableCell>
                                                <TableCell
                                                    classes={{ root: classes.tableCellRoot + ' ' + classes.tableCellRootHead, }}
                                                >
                                                    Surname
                                                </TableCell>
                                                <TableCell
                                                    classes={{ root: classes.tableCellRoot + ' ' + classes.tableCellRootHead, }}
                                                >
                                                    Email
                                                </TableCell>
                                                <TableCell
                                                    classes={{ root: classes.tableCellRoot + ' ' + classes.tableCellRootHead, }}
                                                >
                                                    Created At
                                                </TableCell>
                                                <TableCell
                                                    classes={{ root: classes.tableCellRoot + ' ' + classes.tableCellRootHead, }}
                                                >
                                                    Actions
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {renderAdminAccounts()}
                                        </TableBody>
                                    </Box>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default AdminAccountManagement
