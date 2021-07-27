import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, AppBar, Toolbar, IconButton, Tab, Tabs } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HomeTimelines from '../Components/UserHome/HomeTimelines';
import TimelineList from '../Components/UserHome/TimelineList';
import InviteList from '../Components/UserHome/InviteList';

const UserHome = () => {
	const [ tabValue, setTabValue ] = useState(0);

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	return (
		<React.Fragment>
			<Box display="flex" height="100vh" width="100vw" flexDirection="column">
				<AppBar position="static">
					<Toolbar>
						<IconButton edge="start">
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" color="inherit">
							Trip Planner
						</Typography>
						<Box display="flex" alignItems="center" marginLeft="auto">
							<Typography>Home</Typography>

							<Box display="flex" alignItems="center" marginLeft={4}>
								<PersonIcon />
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
