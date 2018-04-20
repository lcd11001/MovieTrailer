import React from 'react'
import Paper from 'material-ui/Paper'
import Tabs, { Tab } from 'material-ui/Tabs'

export default ({ muscles }) => (
  <Paper>
    <Tabs
      value={0}
      // onChange={this.handleChange}
      indicatorColor='primary'
      textColor='primary'
      centered
    >
      <Tab label='all' key={0} />
      {
        muscles.map((group, i) => (
          <Tab label={group} key={i+1} />
        ))
      }
    </Tabs>
  </Paper>
)
