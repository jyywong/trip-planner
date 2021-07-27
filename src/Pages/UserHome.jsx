import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Box, Typography, AppBar, Toolbar, Tab, Tabs } from '@material-ui/core';
import TimelineList from '../Components/UserHome/TimelineList';
import InviteList from '../Components/UserHome/InviteList';
import { makeStyles } from '@material-ui/core';
import { loggedOut } from '../Slices/AuthSlice';

const useStyles = makeStyles({
	whiteIcon: {
		color: 'white',
		cursor: 'pointer'
	}
});
const UserHome = () => {
	const history = useHistory();
	const classes = useStyles();
	const dispatch = useDispatch();
	const [ tabValue, setTabValue ] = useState(0);

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	const handleSignOut = () => {
		dispatch(loggedOut());
		history.push('/');
	};

	return (
		<React.Fragment>
			<Box display="flex" height="100vh" width="100vw" flexDirection="column">
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" color="inherit">
							Trip Planner
						</Typography>
						<Box display="flex" alignItems="center" marginLeft="auto">
							<Box display="flex" alignItems="center" marginLeft={4}>
								<Typography className={classes.whiteIcon} variant="body1" onClick={handleSignOut}>
									Sign Out
								</Typography>
							</Box>
						</Box>
					</Toolbar>
				</AppBar>
				<Tabs value={tabValue} onChange={handleTabChange} centered>
					<Tab label="My trips" />
					<Tab label="My invites" />
				</Tabs>
				{tabValue === 0 && <TimelineList />}
				{tabValue === 1 && <InviteList />}
			</Box>
		</React.Fragment>
	);
};

export default UserHome;
