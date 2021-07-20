import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Box, Button, Typography, AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { makeStyles } from '@material-ui/styles';
import HomeTimelines from '../Components/UserHome/HomeTimelines';
import { useGetTripsQuery } from '../Services/tripPlannerBackend';

const useStyles = makeStyles({
	gridOverride: {
		flexGrow: '1',
		display: 'grid',
		alignItems: 'center',
		justifyItems: 'center',
		gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
		gridColumnGap: '4rem',
		gridRowGap: '2rem',
		padding: '2rem 8rem'
	}
});
const UserHome = () => {
	const { data, error, isLoading } = useGetTripsQuery();
	const classes = useStyles();

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
							<NotificationsIcon />

							<Box display="flex" alignItems="center" marginLeft={4}>
								<PersonIcon />
							</Box>
						</Box>
					</Toolbar>
				</AppBar>
				<motion.div className={classes.gridOverride} layout>
					{!isLoading && !error && data.map((trip) => <HomeTimelines key={trip.id} trip={trip} />)}
				</motion.div>
			</Box>
		</React.Fragment>
	);
};

export default UserHome;
