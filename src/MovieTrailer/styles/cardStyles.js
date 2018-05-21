import red from '@material-ui/core/colors/red'
import orange from '@material-ui/core/colors/orange'

import textStyles from './textStyles'

const styles = theme => ({
    ...textStyles(theme, {textColor: 'black', textShadowColor: '#2F4F4F'}),

    card: {
        maxWidth: '100%',
    },
    media: {
        height: 0,
        paddingTop: '20%'
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
        width: 100,
        height: 100,
        // extra small
        [theme.breakpoints.only('xs')]: {
            width: 20,
            height: 20,
        },
        // small
        [theme.breakpoints.only('sm')]: {
            width: 40,
            height: 40,
        },
        // medium
        [theme.breakpoints.only('md')]: {
            width: 60,
            height: 60,
        },
        // large
        [theme.breakpoints.only('lg')]: {
            width: 80,
            height: 80,
        }
    },
    avatarText: {
        fontSize: '3.0rem',
        color: 'white',
        textShadow: `${orange[500]} 0px 0px 1px, ${orange[500]} 0px 0px 1px, ${orange[500]} 0px 0px 1px, ${orange[500]} 0px 0px 1px, ${orange[500]} 0px 0px 1px, ${orange[500]} 0px 0px 1px`,
        fontSmoothing: 'antialiased',
        // extra small
        [theme.breakpoints.only('xs')]: {
            fontSize: '2.2rem'
        },
        // small
        [theme.breakpoints.only('sm')]: {
            fontSize: '2.4rem'
        },
        // medium
        [theme.breakpoints.only('md')]: {
            fontSize: '2.6rem'
        },
        // large
        [theme.breakpoints.only('lg')]: {
            fontSize: '2.8rem'
        }
    },
    paragraphHeader: {
        fontSize: '1.5rem',
        textShadow: `${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px`,
        fontSmoothing: 'antialiased',
    },
    paragraph: {
        fontSize: '1.3rem',
        textShadow: `${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px`,
        fontSmoothing: 'antialiased',
    }
})

export default styles