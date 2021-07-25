import React from 'react';
import { motion } from 'framer-motion';
import HomeTimelines from './HomeTimelines';
import { makeStyles } from '@material-ui/styles';
import { useGetTripsQuery } from '../../Services/tripPlannerBackend';
import { Box } from '@material-ui/core';
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
const TimelineList = () => {
	const classes = useStyles();
	const { data, error, isLoading } = useGetTripsQuery();

	return (
		<React.Fragment>
			<Box
				display="flex"
				marginTop={2}
				alignSelf="center"
				boxSizing="border-box"
				boxShadow={3}
				borderRadius="10px"
				overflow="auto"
				width="90%"
				flexBasis="85%"
			>
				<motion.div className={classes.gridOverride} layout>
					{!isLoading && !error && data.map((trip) => <HomeTimelines key={trip.id} trip={trip} />)}
				</motion.div>
			</Box>
		</React.Fragment>
	);
};

export default TimelineList;
