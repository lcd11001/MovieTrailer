const styles = theme => ({
    content: {
        fontSize: '1.7rem',
        textShadow: `${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px`,
        fontSmoothing: 'antialiased',
        margin: 30
    },
    firstLetter: {
        color: theme.palette.primary.main,
        float: 'left',
        fontSize: '5rem',
        paddingTop: 20,
        paddingRight: 8,
        paddingLeft: 3
    },
    tabLabel: {
        fontSize: '1.3rem',
        textShadow: `${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px`,
        fontSmoothing: 'antialiased',
    },
    tab: {
        height: 100
    }
})

export default styles