import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// @material-ui/icons
import Camera from '@material-ui/icons/Camera'
import Palette from '@material-ui/icons/Palette'
import Favorite from '@material-ui/icons/Favorite'
// core components
import Header from '../../components/Header/Header.js'
import Footer from '../../components/Footer/Footer.js'
import Button from '../../components/CustomButtons/Button.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import GridItem from '../../components/Grid/GridItem.js'
import HeaderLinks from '../../components/Header/HeaderLinks.js'
import NavPills from '../../components/NavPills/NavPills.js'
import Parallax from '../../components/Parallax/Parallax.js'

import profile from '../../assets/img/profile.jpg'

import styles from '../../assets/jss/material-kit-react/views/profilePage.js'

const useStyles = makeStyles(styles)

export default function ProfilePage (props) {
    const classes = useStyles()
    const { ...rest } = props
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    )
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery)
    return (
        <div>
            <Header
                color="transparent"
                brand="Material Kit React"
                rightLinks={<HeaderLinks/>}
                fixed
                changeColorOnScroll={{
                    height: 200,
                    color: 'white'
                }}
                {...rest}
            />
            <Parallax small filter image={require('../../assets/img/profile-bg.jpg').default}/>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                                <div className={classes.profile}>
                                    <div>
                                        <img src={profile} alt="..." className={imageClasses}/>
                                    </div>
                                    <div className={classes.name}>
                                        <h3 className={classes.title}>Nam Nguyen</h3>
                                        <h6>Software Engineer</h6>
                                        <Button justIcon link className={classes.margin5}>
                                            <i className={'fab fa-twitter'}/>
                                        </Button>
                                        <Button justIcon link className={classes.margin5}>
                                            <i className={'fab fa-instagram'}/>
                                        </Button>
                                        <Button justIcon link className={classes.margin5}>
                                            <i className={'fab fa-facebook'}/>
                                        </Button>
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <div className={classes.description}>
                            <p>
                                An artist of considerable range, Chet Faker ??? the name taken by
                                Melbourne-raised, Brooklyn-based Nick Murphy ??? writes, performs
                                and records all of his own music, giving it a warm, intimate
                                feel with a solid groove structure.{' '}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
