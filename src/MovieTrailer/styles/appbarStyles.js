import commonStyle from './commonStyle'

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        height: 0,
        ...commonStyle(theme, {key: 'minHeight', value: 80, variant: 10}),
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
})

export default styles