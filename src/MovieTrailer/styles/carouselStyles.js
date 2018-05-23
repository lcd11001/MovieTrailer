import textStyles from './textStyles'
import commonStyle from './commonStyle'

const styles = theme => ({
    title: {
        ...textStyles(theme, {textColor: 'white', textSize: 3.0, textDecreaseSize: 0.5}),
    },

    subtitle: {
        ...textStyles(theme, {textColor: 'white', textSize: 2.0, textDecreaseSize: 0.4}),
    },

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
        ...commonStyle(theme, {key: 'height', value: 130, variant: 20}),
    },
    titleWrap: {
        ...commonStyle(theme, {key: ['marginLeft', 'marginRight'], value: 18, variant: 4}),
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