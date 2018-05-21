
import textStyles from './textStyles'

const styles = theme => ({
    content: {
        ...textStyles(theme, {textColor: theme.palette.text.primary, textSize: 1.7, textDecreaseSize: 0.4, textWrap: 'normal'}),
        margin: 30
    },
    firstLetter: {
        ...textStyles(theme, {textColor: theme.palette.primary.main, textSize: 5.0, textDecreaseSize: 1.0}),
        float: 'left',
        paddingTop: 20,
        paddingRight: 8,
        paddingLeft: 3
    },
    tabLabel: {
        ...textStyles(theme, {textColor: theme.palette.text.secondary, textSize: 1.3, textDecreaseSize: 0.2}),
    },
    tab: {
        height: 100
    }
})

export default styles