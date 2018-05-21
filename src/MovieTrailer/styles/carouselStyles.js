import textStyles from './textStyles'

const styles = theme => ({
    ...textStyles(theme),
    
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
    titleWrap: {
        marginLeft: 18,
        marginRight: 18,
        // extra small
        [theme.breakpoints.only('xs')]: {
            marginLeft: 5,
            marginRight: 5,
        },
        // small
        [theme.breakpoints.only('sm')]: {
            marginLeft: 8,
            marginRight: 8,
        },
        // medium
        [theme.breakpoints.only('md')]: {
            marginLeft: 11,
            marginRight: 11,
        },
        // large
        [theme.breakpoints.only('lg')]: {
            marginLeft: 14,
            marginRight: 14,
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