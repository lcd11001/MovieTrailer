const styles = (theme, options) => {
    options = options || {}

    const useTextShadow = options.useTextShadow == null ? true : options.useTextShadow

    const textStyles = {
        color: options.textColor || 'white',
        whiteSpace: `${options.textWrap}` || 'nowrap',
        fontSmoothing: 'antialiased'
    }

    const textShadow = {
        textShadow: `${options.textShadowColor || theme.palette.primary.dark} 0px 0px 1px, 
                    ${options.textShadowColor || theme.palette.primary.dark} 0px 0px 1px, 
                    ${options.textShadowColor || theme.palette.primary.dark} 0px 0px 1px, 
                    ${options.textShadowColor || theme.palette.primary.dark} 0px 0px 1px, 
                    ${options.textShadowColor || theme.palette.primary.dark} 0px 0px 1px, 
                    ${options.textShadowColor || theme.palette.primary.dark} 0px 0px 1px`,
    }

    const textSize = options.textSize || 3.0
    const textDecreaseSize = options.textDecreaseSize || 0.5

    if (useTextShadow) {
        return {
            ...textStyles,
            ...textShadow,
    
            fontSize: `${textSize}rem`,
            // extra small
            [theme.breakpoints.only('xs')]: {
                fontSize: `${textSize - 4 * textDecreaseSize}rem`
            },
            // small
            [theme.breakpoints.only('sm')]: {
                fontSize: `${textSize - 3 * textDecreaseSize}rem`
            },
            // medium
            [theme.breakpoints.only('md')]: {
                fontSize: `${textSize - 2 * textDecreaseSize}rem`
            },
            // large
            [theme.breakpoints.only('lg')]: {
                fontSize: `${textSize - textDecreaseSize}rem`
            }
        }
    }

    return {
        ...textStyles,

        fontSize: `${textSize}rem`,
        // extra small
        [theme.breakpoints.only('xs')]: {
            fontSize: `${textSize - 4 * textDecreaseSize}rem`
        },
        // small
        [theme.breakpoints.only('sm')]: {
            fontSize: `${textSize - 3 * textDecreaseSize}rem`
        },
        // medium
        [theme.breakpoints.only('md')]: {
            fontSize: `${textSize - 2 * textDecreaseSize}rem`
        },
        // large
        [theme.breakpoints.only('lg')]: {
            fontSize: `${textSize - textDecreaseSize}rem`
        }
    }
}

export default styles