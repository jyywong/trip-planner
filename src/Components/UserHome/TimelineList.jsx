import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HomeTimelines from './HomeTimelines';
import NewTripForm from './NewTripForm';
import { makeStyles } from '@material-ui/styles';
import { useGetTripsQuery } from '../../Services/tripPlannerBackend';
import { Box, Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles({
	gridOverride: {
		boxSizing: 'border-box',
		flexGrow: '1',
		display: 'grid',
		width: '100%',
		alignItems: 'center',
		justifyItems: 'center',
		gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
		gridColumnGap: '4rem',
		gridRowGap: '2rem',
		padding: '2rem 8rem'
	},
	root: {
		'&::-webkit-scrollbar': {
			width: '16px'
		},
		'&::-webkit-scrollbar-track': {
			background: 'transparent'
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: '#a3a3a3',
			borderRadius: '10px',
			border: '5px solid #f2f2f2'
		}
	}
});
const TimelineList = () => {
	const [ showForm, setShowForm ] = useState(false);
	const classes = useStyles();
	const { data, error, isLoading } = useGetTripsQuery();

	return (
		<React.Fragment>
			<Box
				display="flex"
				marginTop={2}
				alignSelf="center"
				boxSizing="border-box"
				flexDirection="column"
				boxShadow={3}
				borderRadius="10px"
				overflow="auto"
				width="90%"
				flexBasis="85%"
			>
				<Box
					boxSizing="border-box"
					display="flex"
					alignItems="flex-end"
					flexBasis="14%"
					paddingY={1}
					paddingX={3}
					bgcolor="gray"
				>
					<Typography variant="h2">My Trips</Typography>
					<Box marginLeft="auto" alignSelf="center">
						<Button
							variant="outlined"
							size="large"
							onClick={() => {
								setShowForm(true);
							}}
						>
							<AddIcon />
						</Button>
					</Box>
				</Box>

				<Box display="flex" flexDirection="column" alignItems="center" overflow="auto" className={classes.root}>
					{showForm && <NewTripForm setShowForm={setShowForm} />}
					<motion.div className={classes.gridOverride} layout>
						{!isLoading && !error && data.map((trip) => <HomeTimelines key={trip.id} trip={trip} />)}
					</motion.div>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default TimelineList;
