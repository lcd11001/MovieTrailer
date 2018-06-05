import commonStyle from './commonStyle'

const styles = (theme) => ({
    list: {
        ...commonStyle(theme, {key: 'width', value: 250, variant: 10}),
    },
    drawerPaper: {
        ...commonStyle(theme, {key: 'top', value: 80, variant: 10}),
    },
    drawerModal: {
        ...commonStyle(theme, {key: 'top', value: 80, variant: 10}),
    },
    drawerBackdrop: {
        ...commonStyle(theme, {key: 'top', value: 80, variant: 10}),
    },
    child: {
        ...commonStyle(theme, {key: 'marginTop', value: 80, variant: 10}),
    }
})

export default styles