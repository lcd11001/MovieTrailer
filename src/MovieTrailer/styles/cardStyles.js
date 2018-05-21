import red from '@material-ui/core/colors/red'
import orange from '@material-ui/core/colors/orange'

import textStyles from './textStyles'

const styles = theme => ({
    title: {
        ...textStyles(theme, {textColor: 'black', textShadowColor: '#2F4F4F', textSize: 3.0, textDecreaseSize: 0.5}),
    },

    subtitle: {
        ...textStyles(theme, {textColor: 'black', textShadowColor: '#2F4F4F', textSize: 2.0, textDecreaseSize: 0.4}),
    },

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
            width: 40,
            height: 40,
        },
        // small
        [theme.breakpoints.only('sm')]: {
            width: 55,
            height: 55,
        },
        // medium
        [theme.breakpoints.only('md')]: {
            width: 70,
            height: 70,
        },
        // large
        [theme.breakpoints.only('lg')]: {
            width: 85,
            height: 85,
        }
    },
    avatarText: {
        ...textStyles(theme, {textShadowColor: orange[500], textSize: 3.0, textDecreaseSize: 0.5})
    },
    paragraphHeader: {
        ...textStyles(theme, {textColor: 'black', textShadowColor: theme.palette.text.secondary, textSize: 1.5, textDecreaseSize: 0.2})
    },
    paragraph: {
        ...textStyles(theme, {textColor: 'black', textShadowColor: theme.palette.text.secondary, textSize: 1.3, textDecreaseSize: 0.2})
    }
})

export default styles