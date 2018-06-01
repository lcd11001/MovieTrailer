import commonStyle from './commonStyle'

const w = 240
const v = 30

const calcDrawerWidth = theme => ({
    width: w,
    [theme.breakpoints.only('xs')]: {
        width: `${w - 4 * v}`
    },
    // small
    [theme.breakpoints.only('sm')]: {
        width: `${w - 3 * v}`
    },
    // medium
    [theme.breakpoints.only('md')]: {
        width: `${w - 2 * v}`
    },
    // large
    [theme.breakpoints.only('lg')]: {
        width: `${w - v}`
    }
})

const styles = theme => {
    let obj = calcDrawerWidth(theme)
    let drawerWidth = obj.width
    console.log('drawerWidth', drawerWidth, 'obj', obj, 'parent theme', theme)

    return {
        root: {
            flexGrow: 1,
        },
        appFrame: {
            zIndex: 1,
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            width: '100%',
        },
        appBar: {
            position: 'absolute',
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        'appBarShift-left': {
            marginLeft: drawerWidth,
        },
        'appBarShift-right': {
            marginRight: drawerWidth,
        },
        menuButton: {
            marginLeft: 12,
            marginRight: 20,
        },
        hide: {
            display: 'none',
        },
        drawerPaper: {
            position: 'relative',
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing.unit,
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        'content-left': {
            marginLeft: -drawerWidth,
        },
        'content-right': {
            marginRight: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        'contentShift-left': {
            marginLeft: 0,
        },
        'contentShift-right': {
            marginRight: 0,
        },
    }
}

export default styles