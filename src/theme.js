import { createMuiTheme } from '@material-ui/core/styles'

// https://material-ui.com/customization/default-theme/
const theme = createMuiTheme({
    palette: {
        background: {
            default: '#f2f2f2', // body background-color
        }
    },
    typography: {
        useNextVariants: true,
    }
})

export default theme