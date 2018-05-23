const styles = (theme, options) => {
    options = options || {}

    const key = options.key
    const value = options.value || 3.0
    const variant = options.variant || 0.5
    const unit = options.unit || 'px'

    if (Array.isArray(key))
    {
        //[FIXED ME]
        const key0 = key[0]
        const key1 = key[1] || key0
        const key2 = key[2] || key0
        const key3 = key[3] || key0

        const value0 = Array.isArray(value) ? value[0] : value
        const value1 = Array.isArray(value) ? (value[1] == null ? value0 : value[1]) : value
        const value2 = Array.isArray(value) ? (value[2] == null ? value0 : value[2]) : value
        const value3 = Array.isArray(value) ? (value[3] == null ? value0 : value[3]) : value

        const variant0 = Array.isArray(variant) ? variant[0] : variant
        const variant1 = Array.isArray(variant) ? (variant[1] == null ? variant0 : variant[1]) : variant
        const variant2 = Array.isArray(variant) ? (variant[2] == null ? variant0 : variant[2]) : variant
        const variant3 = Array.isArray(variant) ? (variant[3] == null ? variant0 : variant[3]) : variant

        return {
            [key0]: `${value0}${unit}`,
            [key1]: `${value1}${unit}`,
            [key2]: `${value2}${unit}`,
            [key3]: `${value3}${unit}`,
            // extra small
            [theme.breakpoints.only('xs')]: {
                [key0]: `${value0 - 4 * variant0}${unit}`,
                [key1]: `${value1 - 4 * variant1}${unit}`,
                [key2]: `${value2 - 4 * variant2}${unit}`,
                [key3]: `${value3 - 4 * variant3}${unit}`
            },
            // small
            [theme.breakpoints.only('sm')]: {
                [key0]: `${value0 - 3 * variant0}${unit}`,
                [key1]: `${value1 - 3 * variant1}${unit}`,
                [key2]: `${value2 - 3 * variant2}${unit}`,
                [key3]: `${value3 - 3 * variant3}${unit}`,
            },
            // medium
            [theme.breakpoints.only('md')]: {
                [key0]: `${value0 - 2 * variant0}${unit}`,
                [key1]: `${value1 - 2 * variant1}${unit}`,
                [key2]: `${value2 - 2 * variant2}${unit}`,
                [key3]: `${value3 - 2 * variant3}${unit}`,
            },
            // large
            [theme.breakpoints.only('lg')]: {
                [key0]: `${value0 - variant0}${unit}`,
                [key1]: `${value1 - variant1}${unit}`,
                [key2]: `${value2 - variant2}${unit}`,
                [key3]: `${value3 - variant3}${unit}`,
            }
        }
    }

    return {
        [key]: `${value}${unit}`,
        // extra small
        [theme.breakpoints.only('xs')]: {
            [key]: `${value - 4 * variant}${unit}`
        },
        // small
        [theme.breakpoints.only('sm')]: {
            [key]: `${value - 3 * variant}${unit}`
        },
        // medium
        [theme.breakpoints.only('md')]: {
            [key]: `${value - 2 * variant}${unit}`
        },
        // large
        [theme.breakpoints.only('lg')]: {
            [key]: `${value - variant}${unit}`
        }
    }
}

export default styles