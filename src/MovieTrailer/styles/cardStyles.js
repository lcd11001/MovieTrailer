import red from '@material-ui/core/colors/red'
import gray from '@material-ui/core/colors/grey'
import orange from '@material-ui/core/colors/orange'

import textStyles from './textStyles'
import commonStyle from './commonStyle'


const styles = theme => ({
    title: {
        ...textStyles(theme, {textColor: theme.palette.primary.main, useTextShadow: false, textSize: 3.0, textDecreaseSize: 0.5}),
    },

    subtitle: {
        ...textStyles(theme, {textColor: 'black', useTextShadow: false, textSize: 2.0, textDecreaseSize: 0.3}),
    },

    card: {
        maxWidth: '100%',
    },
    media: {
        height: 0,
        paddingTop: '30%',
        // ...commonStyle(theme, {key: 'height', value: 400, variant: 50, unit: 'px'}),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
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
        ...commonStyle(theme, {key: ['width', 'height'], value: 100, variant: 15, unit: 'px'}),
    },
    avatarText: {
        ...textStyles(theme, {textShadowColor: orange[500], textSize: 3.0, textDecreaseSize: 0.5})
    },
    paragraphHeader: {
        ...textStyles(theme, {textColor: 'black', useTextShadow: false, textSize: 1.5, textDecreaseSize: 0.2})
    },
    paragraph: {
        ...textStyles(theme, {textColor: theme.palette.primary.main, useTextShadow: false, textSize: 1.3, textDecreaseSize: 0.2})
    },
    playIcon: {
        ...commonStyle(theme, {key: 'fontSize', value: 7, variant: 1, unit: 'rem'}),
        color: gray[100]
    },
    playIconHover: {
        '&:hover': {
            color: orange[500]
        }
    },
    playButton: {
        ...commonStyle(theme, {key: ['width', 'height'], value: 150, variant: 25, unit: 'px'}),
    },
    divPlayButton: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default styles