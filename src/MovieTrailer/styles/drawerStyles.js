import commonStyle from './commonStyle'

const styles = (theme) => ({
    list: {
        ...commonStyle(theme, {key: 'width', value: 320, variant: 10, unit: 'px !important'}),
    },
    drawerPaper: {
        ...commonStyle(theme, {key: 'top', value: 80, variant: 10, unit: 'px !important'}),
    },
    drawerModal: {
        ...commonStyle(theme, {key: 'top', value: 80, variant: 10, unit: 'px !important'}),
    },
    drawerBackdrop: {
        ...commonStyle(theme, {key: 'top', value: 80, variant: 10, unit: 'px !important'}),
    },
    child: {
        ...commonStyle(theme, {key: 'marginTop', value: 80, variant: 10, unit: 'px !important'}),
    }
})

export default styles