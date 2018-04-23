import React from 'react'
import Paper from 'material-ui/Paper'
import Tabs, { Tab } from 'material-ui/Tabs'
import withWidth from 'material-ui/utils/withWidth'

export default withWidth()(
  ({ muscles, category, onSelect }) => {
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
          scrollable
          scrollButtons="auto"
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
