import textStyles from './textStyles'
import commonStyle from './commonStyle'

const styles = theme => ({
    title: {
        ...textStyles(theme, {textColor: 'black', textShadowColor: '#AAA', textSize: 3.0, textDecreaseSize: 0.5}),
    },

    subtitle: {
        ...textStyles(theme, {textColor: 'black', textShadowColor: '#2F4F4F', textSize: 2.0, textDecreaseSize: 0.4}),
    },
    centerDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // background: 'red',
    },
    playerWrapper: {
        // ...commonStyle(theme, {key: ['width', 'height'], value: [1600, 900], variant: [300, 168]}),
        // 16 : 9
        width: '80%',
        height: '45%'
    },

    reactPlayer: {
        margin: 0,
    }
})

export default styles