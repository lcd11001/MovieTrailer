const styles = (theme, options) => {
    options = options || {}

    const textStyles = {
        color: options.textColor || 'white',
        whiteSpace: 'nowrap',
        textShadow: `${options.textShadowColor || theme.palette.primary.dark} 0px 0px 1px, 
                    ${options.textShadowColor || theme.palette.primary.dark} 0px 0px 1px, 
                    ${options.textShadowColor || theme.palette.primary.dark} 0px 0px 1px, 
                    ${options.textShadowColor || theme.palette.primary.dark} 0px 0px 1px, 
                    ${options.textShadowColor || theme.palette.primary.dark} 0px 0px 1px, 
                    ${options.textShadowColor || theme.palette.primary.dark} 0px 0px 1px`,
        fontSmoothing: 'antialiased'
    }

    const titleSize = options.titleSize || 3.0
    const titleDecreaseSize = options.titleDecreaseSize || 0.5

    const subTitleSize = options.subTitleSize || 2.0
    const subTitleDecreaseSize = options.subTitleDecreaseSize || 0.4

    return {
        title: {
            ...textStyles,

            fontSize: `${titleSize}rem`,
            // extra small
            [theme.breakpoints.only('xs')]: {
                fontSize: `${titleSize - 4 * titleDecreaseSize}rem`
            },
            // small
            [theme.breakpoints.only('sm')]: {
                fontSize: `${titleSize - 3 * titleDecreaseSize}rem`
            },
            // medium
            [theme.breakpoints.only('md')]: {
                fontSize: `${titleSize - 2 * titleDecreaseSize}rem`
            },
            // large
            [theme.breakpoints.only('lg')]: {
                fontSize: `${titleSize - titleDecreaseSize}rem`
            }
        },
        subtitle: {
            ...textStyles,

            fontSize: `${subTitleSize}rem`,
            // extra small
            [theme.breakpoints.only('xs')]: {
                fontSize: `${subTitleSize - 4 * subTitleDecreaseSize}rem`
            },
            // small
            [theme.breakpoints.only('sm')]: {
                fontSize: `${subTitleSize - 3 * subTitleDecreaseSize}rem`
            },
            // medium
            [theme.breakpoints.only('md')]: {
                fontSize: `${subTitleSize - 2 * subTitleDecreaseSize}rem`
            },
            // large
            [theme.breakpoints.only('lg')]: {
                fontSize: `${subTitleSize - subTitleDecreaseSize}rem`
            }
        }
    }
}

export default styles