
import textStyles from './textStyles'

const styles = theme => ({
    content: {
        ...textStyles(theme, {textColor: theme.palette.text.primary, textSize: 1.7, textDecreaseSize: 0.25, textWrap: 'normal'}),
        margin: 30
    },
    firstLetter: {
        ...textStyles(theme, {textColor: theme.palette.primary.main, textSize: 5.0, textDecreaseSize: 0.8}),
    },
    firstLetterPadding: {
        float: 'left',
        paddingTop: 20,
        paddingRight: 8,
        paddingLeft: 3,
        // extra small
        [theme.breakpoints.only('xs')]: {
            paddingTop: 8,
            paddingRight: 4,
        },
        // small
        [theme.breakpoints.only('sm')]: {
            paddingTop: 11,
            paddingRight: 5,
        },
        // medium
        [theme.breakpoints.only('md')]: {
            paddingTop: 14,
            paddingRight: 6,
        },
        // large
        [theme.breakpoints.only('lg')]: {
            paddingTop: 17,
            paddingRight: 7,
        }
    },
    tabLabel: {
        ...textStyles(theme, {textColor: theme.palette.text.secondary, textSize: 1.3, textDecreaseSize: 0.2}),
    },
    tab: {
        height: 100,
        // extra small
        [theme.breakpoints.only('xs')]: {
            height: 60,
        },
        // small
        [theme.breakpoints.only('sm')]: {
            height: 70,
        },
        // medium
        [theme.breakpoints.only('md')]: {
            height: 80,
        },
        // large
        [theme.breakpoints.only('lg')]: {
            height: 90,
        }
    },
    tabIcon: {
        zoom: 1.0,
        // extra small
        [theme.breakpoints.only('xs')]: {
            zoom: 0.6,
        },
        // small
        [theme.breakpoints.only('sm')]: {
            zoom: 0.7,
        },
        // medium
        [theme.breakpoints.only('md')]: {
            zoom: 0.8,
        },
        // large
        [theme.breakpoints.only('lg')]: {
            zoom: 0.9,
        }
    }
})

export default styles