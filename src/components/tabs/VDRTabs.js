import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Typography, Box, Tabs, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';

import HomeIcon from '@material-ui/icons/Home';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SettingsIcon from '@material-ui/icons/Settings';
import QuestionTabContent from './QuestionTabContent'

import Proponents from './sitemanagement/Proponents'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function VDRTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Home" icon={<HomeIcon />} {...a11yProps(0)} />
                    <Tab label="Questions" icon={<QuestionAnswerIcon />} {...a11yProps(1)} />
                    <Tab label="Proponent Management" icon={<SettingsIcon />} {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                Home
            </TabPanel>
            <TabPanel value={value} index={1}>
                <QuestionTabContent />
                <Paper>
                    <h2>Proponent Management</h2>
                    <Proponents />
                </Paper>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Questions
            </TabPanel>
            <TabPanel value={value} index={2}>
                Site Management
            </TabPanel>
        </div>
    );
}