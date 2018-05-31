import commonStyle from './commonStyle'
import textStyles from './textStyles'

const styles = theme => ({
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    divHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        alignItems: 'center'
    },
    header: {
        ...textStyles(theme, {textColor: theme.palette.primary.contrastText, textShadowColor: theme.palette.primary.light, textSize: 2.0, textDecreaseSize: 0.3}),
    },
    moreIcon: {
        color: theme.palette.primary.contrastText
    }
})

export default styles