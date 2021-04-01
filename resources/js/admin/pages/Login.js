import React, { useState } from 'react'
import { userActions } from '../actions'
import { useDispatch, connect } from 'react-redux'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Checkbox from '@material-ui/core/Checkbox'
import FilledInput from '@material-ui/core/FilledInput'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
// @material-ui/icons components
import Email from '@material-ui/icons/Email'
import Lock from '@material-ui/icons/Lock'

// core components
import componentStyles from '../assets/theme/pages/login.js'

const useStyles = makeStyles(componentStyles)

const Login = () => {
    const classes = useStyles()
    const theme = useTheme()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)

    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleRemember = () => setRemember(!remember)

    const handleLogin = () => {
        if (!email || !password) return
        dispatch(userActions.login(email, password, remember))
    }
    return (
        <>
            <Grid item xs={12} lg={5} md={7}>
                <Card classes={{ root: classes.cardRoot }}>
                    <CardContent classes={{ root: classes.cardContent }}>
                            <Box
                                color={theme.palette.gray[600]}
                                textAlign="center"
                                marginBottom="1rem"
                                marginTop=".5rem"
                                fontSize="1rem"
                            >
                                <Box fontSize="100%" fontWeight="400" component="small">
                                    Sign in with credentials
                                </Box>
                            </Box>
                            <FormControl
                                variant="filled"
                                component={Box}
                                width="100%"
                                marginBottom="1rem!important"
                            >
                                <FilledInput
                                    autoComplete="off"
                                    type="email"
                                    placeholder="Email"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Email/>
                                        </InputAdornment>
                                    }
                                    value={email}
                                    onChange={handleChangeEmail}
                                />
                            </FormControl>
                            <FormControl
                                variant="filled"
                                component={Box}
                                width="100%"
                                marginBottom="1rem!important"
                            >
                                <FilledInput
                                    autoComplete="off"
                                    type="password"
                                    placeholder="Password"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Lock/>
                                        </InputAdornment>
                                    }
                                    value={password}
                                    onChange={handleChangePassword}
                                />
                            </FormControl>
                            <FormControlLabel
                                control={<Checkbox value={remember} onChange={handleRemember} color="primary"/>}
                                label="Remeber me"
                                labelPlacement="end"
                                classes={{
                                    root: classes.formControlLabelRoot,
                                    label: classes.formControlLabelLabel,
                                }}
                            />
                            <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
                                <Button color="primary" variant="contained" onClick={handleLogin}>
                                    Sign in
                                </Button>
                            </Box>
                    </CardContent>
                </Card>
                <Grid container component={Box} marginTop="1rem">
                    <Grid item xs={6} component={Box} textAlign="left">
                        <a
                            href="#admui"
                            onClick={(e) => e.preventDefault()}
                            className={classes.footerLinks}
                        >
                            Forgot password
                        </a>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

export default connect(mapStateToProps)(Login);
