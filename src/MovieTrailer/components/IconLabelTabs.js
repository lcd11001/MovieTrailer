import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

import { tabsStyles as styles } from '../styles'

function TabContainer(props) {
    console.log('TabContainer', props)
    return (
        <Typography component="p" className={props.classes.content}>
            <span className={`${props.classes.firstLetter}  ${props.classes.firstLetterPadding}`}>
                {props.children.substring(0, 1)}
            </span>
            {props.children.substring(1)}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
}

class IconLabelTabs extends React.Component {
    state = {
        value: 0,
    }

    handleChange = (event, value) => {
        this.setState({ value })
    }

    render() {
        const {
            value
        } = this.state

        const {
            data,
            classes
        } = this.props

        return (
            <Fragment>
                <Paper style={{ width: '100%' }}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        fullWidth
                        indicatorColor="secondary"
                        textColor="secondary"
                    >
                        {
                            data.map((value, index) => (
                                <Tab key={index} 
                                    icon={
                                        <img src={value.icon} alt={value.icon} className={classes.tabIcon} />
                                    } 
                                    label={
                                        <Typography className={classes.tabLabel}>{value.label}</Typography>
                                    } 
                                    className={classes.tab}
                                />
                            ))
                        }
                        
                    </Tabs>
                </Paper>

                <TabContainer {...{classes: this.props.classes}}>{data[value].content}</TabContainer>
            </Fragment>
        )
    }
}

IconLabelTabs.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default compose ( withStyles(styles), withWidth() )(IconLabelTabs)