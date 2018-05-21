import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card: {
        maxWidth: '100%',
    },
    content: {
        fontSize: '1.7rem',
        textShadow: `${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px`,
        fontSmoothing: 'antialiased',
        margin: 30
    },
    firstLetter: {
        color: theme.palette.primary.main,
        float: 'left',
        fontSize: '5rem',
        paddingTop: 20,
        paddingRight: 8,
        paddingLeft: 3
    }
})

function TabContainer(props) {
    return (
        <Typography component="p" className={props.classes.content}>
            <span className={props.classes.firstLetter}>
                {props.children.substring(0, 1)}
            </span>
            {props.children.substring(1)}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
};

class IconLabelTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

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
                                <Tab key={index} icon={<img src={value.icon} alt={value.icon} />} label={value.label} />
                            ))
                        }
                        
                    </Tabs>
                </Paper>

                <TabContainer {...{classes: this.props.classes}}>{data[value].content}</TabContainer>
            </Fragment>
        );
    }
}

IconLabelTabs.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(IconLabelTabs)