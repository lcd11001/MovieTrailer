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
        fontSize: '2.0rem',
        // extra small
        [theme.breakpoints.only('xs')]: {
            fontSize: '0.8rem'
        },
        // small
        [theme.breakpoints.only('sm')]: {
            fontSize: '1.1rem'
        },
        // medium
        [theme.breakpoints.only('md')]: {
            fontSize: '1.4rem'
        },
        // large
        [theme.breakpoints.only('lg')]: {
            fontSize: '1.7rem'
        }
    },
})

export default styles