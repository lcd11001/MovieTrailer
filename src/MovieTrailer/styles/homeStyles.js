import commonStyle from './commonStyle'
import textStyles from './textStyles'

const styles = theme => ({
    divHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        backgroundColor: theme.palette.primary.main,
        width: '100%',
        alignItems: 'center',
        ...commonStyle(theme, {key: 'height', value: 90, variant: 15}),
    },
    header: {
        ...textStyles(theme, {textColor: theme.palette.primary.contrastText, textShadowColor: theme.palette.primary.light, textSize: 2.0, textDecreaseSize: 0.3}),
    },
    moreIcon: {
        color: theme.palette.primary.contrastText
    }
})

export default styles