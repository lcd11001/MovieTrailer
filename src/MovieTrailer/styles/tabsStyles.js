
import textStyles from './textStyles'
import commonStyle from './commonStyle'

const styles = theme => ({
    content: {
        ...textStyles(theme, {textColor: 'black', useTextShadow: false, textSize: 1.7, textDecreaseSize: 0.25, textWrap: 'normal'}),
        margin: 30
    },
    firstLetter: {
        ...textStyles(theme, {textColor: theme.palette.primary.main, textShadowColor: theme.palette.primary.contrastText, textSize: 5.0, textDecreaseSize: 0.8}),
    },
    firstLetterPadding: {
        float: 'left',
        ...commonStyle(theme, {key: ['paddingTop', 'paddingRight', 'paddingLeft'], value: [20, 8, 3], variant: [3, 1, 0]}),
    },
    tabLabel: {
        ...textStyles(theme, {textColor: theme.palette.primary.main, useTextShadow: false, textSize: 1.3, textDecreaseSize: 0.2}),
    },
    tabLabelActive: {
        ...textStyles(theme, {textColor: theme.palette.secondary.main, useTextShadow: false, textSize: 1.3, textDecreaseSize: 0.2}),
    },
    tab: {
        ...commonStyle(theme, {key: 'height', value: 100, variant: 10}),
    },
    tabIcon: {
        ...commonStyle(theme, {key: 'zoom', value: 100, variant: 10, unit: '%'}),
    }
})

export default styles