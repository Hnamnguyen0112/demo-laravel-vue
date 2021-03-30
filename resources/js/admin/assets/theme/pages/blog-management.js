import boxShadows from '../box-shadow.js'

const componentStyles = (theme) => ({
    cardRoot: {
        boxShadow: boxShadows.boxShadow + '!important',
    },
    cardHeader: {
        backgroundColor: 'initial',
    },
    containerRoot: {
        [theme.breakpoints.up('md')]: {
            paddingLeft: '39px',
            paddingRight: '39px',
        },
    },
    iframe: {
        width: '100%',
        height: '500px',
        border: '0',
    },
})

export default componentStyles
