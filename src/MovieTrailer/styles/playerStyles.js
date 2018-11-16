import textStyles from './textStyles'

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
        paddingTop: '46.125%', // 16:9 => 56.25% => w: 80% & top: 1% => 56.25 * 0.82 => 46.125%
        height: 0,
        position: 'relative'
    },
    playerWrapper: {
        position: 'absolute',
        top: '1%',
        left: '10%',
        width: '80%',
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