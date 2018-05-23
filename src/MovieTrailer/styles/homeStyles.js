import commonStyle from './commonStyle'

const styles = theme => ({
    loading: {
        display: 'flex',
        justifyContent: 'center',
    },
    divHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        backgroundColor: theme.palette.primary.light,
        width: '100%',
        alignItems: 'center'
    },
    header: {
        color: theme.palette.text.primary,
        whiteSpace: 'normal',
        textShadow: `${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px`,
        fontSmoothing: 'antialiased',
        ...commonStyle(theme, {key: 'fontSize', value: 2.0, variant: 0.3, unit: 'rem'}),
    },
})

export default styles