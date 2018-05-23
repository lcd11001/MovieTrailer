import red from '@material-ui/core/colors/red'
import orange from '@material-ui/core/colors/orange'

import textStyles from './textStyles'
import commonStyle from './commonStyle'


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
        // height: 0,
        // paddingTop: '20%',
        ...commonStyle(theme, {key: 'height', value: 300, variant: 50, unit: 'px'}),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        ...textStyles(theme, {textColor: 'black', textShadowColor: theme.palette.text.secondary, textSize: 1.5, textDecreaseSize: 0.2})
    },
    paragraph: {
        ...textStyles(theme, {textColor: 'black', textShadowColor: theme.palette.text.secondary, textSize: 1.3, textDecreaseSize: 0.2})
    },
    playIcon: {
        ...commonStyle(theme, {key: 'fontSize', value: 6, variant: 1, unit: 'rem'}),
        color: 'red'
    },
    playButton: {
        ...commonStyle(theme, {key: ['width', 'height'], value: 240, variant: 48, unit: 'px'}),
    }
})

export default styles