import textStyles from './textStyles'
import commonStyle from './commonStyle'

const styles = theme => ({
    title: {
        ...textStyles(theme, {textColor: theme.palette.primary.main, useTextShadow: false, textSize: 3.0, textDecreaseSize: 0.5}),
    },
    subtitle: {
        ...textStyles(theme, {textColor: 'black', useTextShadow: false, textSize: 2.0, textDecreaseSize: 0.3}),
    },
    centerDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // background: 'red',
        paddingTop: '56.25%', // 16:9
        height: 0,
        position: 'relative'
    },
    playerWrapper: {
        position: 'absolute',
        top: '1%',
        left: '1%',
        width: '98%',
        height: '98%'
    },

    reactPlayer: {
        margin: 0,
    },

    button: {
        margin: theme.spacing.unit,
    }
})

export default styles