const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.main,
        whiteSpace: 'nowrap',
        textShadow: `${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px`,
        fontSmoothing: 'antialiased',
        fontSize: '3.0rem',
        // extra small
        [theme.breakpoints.only('xs')]: {
            fontSize: '1.0rem'
        },
        // small
        [theme.breakpoints.only('sm')]: {
            fontSize: '1.5rem'
        },
        // medium
        [theme.breakpoints.only('md')]: {
            fontSize: '2.0rem'
        },
        // large
        [theme.breakpoints.only('lg')]: {
            fontSize: '2.5rem'
        }
    },
    subtitle: {
        color: theme.palette.primary.light,
        whiteSpace: 'nowrap',
        textShadow: `${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px`,
        fontSmoothing: 'antialiased',
        fontSize: '2.5rem',
        // extra small
        [theme.breakpoints.only('xs')]: {
            fontSize: '0.5rem'
        },
        // small
        [theme.breakpoints.only('sm')]: {
            fontSize: '1.0rem'
        },
        // medium
        [theme.breakpoints.only('md')]: {
            fontSize: '1.5rem'
        },
        // large
        [theme.breakpoints.only('lg')]: {
            fontSize: '2.0rem'
        }
    },
    titleBar: {
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        height: 130,
        // extra small
        [theme.breakpoints.only('xs')]: {
            height: 50,
        },
        // small
        [theme.breakpoints.only('sm')]: {
            height: 70,
        },
        // medium
        [theme.breakpoints.only('md')]: {
            height: 90,
        },
        // large
        [theme.breakpoints.only('lg')]: {
            height: 110,
        }
    },
    divImage: {
        height: '100%',
        width: '100%'
    },
    image: {
        height: '100%',
        width: '100%',
        objectFit: 'cover'
    },
    divActionIcon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignContent: 'center',
        // backgroundColor: '#F00',
        width: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 1
    },
})

export default styles