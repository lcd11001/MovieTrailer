import React from 'react';
import PropTypes from 'prop-types';

import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import { drawerStyles as styles } from '../styles'

const TemporaryDrawer = (props) => {
    
    const { classes, menuItems, open, onClose } = props;

    const sideList = (
        <div className={classes.list}>
            <List>{menuItems}</List>
        </div>
    );

    return (
        <div>
            <Drawer anchor="left" open={open} onClose={onClose(false)} classes={{paper: classes.drawerPaper}}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={onClose(false)}
                    onKeyDown={onClose(false)}
                >
                    {sideList}
                </div>
            </Drawer>
        </div>
    );

}

TemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    menuItems: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default compose ( withStyles(styles), withWidth() ) (TemporaryDrawer)
