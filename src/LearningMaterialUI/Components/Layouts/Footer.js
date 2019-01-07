import React from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import withWidth from '@material-ui/core/withWidth'

export default withWidth()(
    ({ muscles, category, onSelect, width }) => {
        const index = category
            ? muscles.findIndex(group => group === category) + 1
            : 0

        const onIndexChange = (event, value) => {
            onSelect(value === 0 ? '' : muscles[value - 1])
        }

        return (
            <Paper>
                <Tabs
                    value={index}
                    onChange={onIndexChange}
                    indicatorColor='primary'
                    textColor='primary'
                    centered={width !== 'xs'}
                    variant={width === 'xs' ? 'scrollable' : 'fullWidth'}
                >
                    <Tab label='all' key={0} />
                    {
                        muscles.map((group, i) => (
                            <Tab label={group} key={i + 1} />
                        ))
                    }
                </Tabs>
            </Paper>
        )
    }
)
