import React from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import withWidth from '@material-ui/core/withWidth'
import { compose } from 'recompose'
import { withContext } from '../../Context'

class Footer extends React.Component {
    onIndexChange = (event, value) => {
        const {
            onCategorySelect,
            muscles
        } = this.props

        onCategorySelect(value === 0 ? '' : muscles[value - 1])
    }

    getIndex = () => {
        const {
            muscles,
            category
        } = this.props

        return category
            ? muscles.findIndex(group => group === category) + 1
            : 0
    }

    render() {
        const {
            width,
            muscles
        } = this.props

        return (
            <Paper>
                <Tabs
                    value={this.getIndex()}
                    onChange={this.onIndexChange}
                    indicatorColor='secondary'
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
}

export default compose(withContext, withWidth())(Footer)
