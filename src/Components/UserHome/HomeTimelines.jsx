import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Typography, Button } from '@material-ui/core';
import { truncate } from '../../HelperFunction';
import VisualTimeline from './VisualTimeline';
import ClearIcon from '@material-ui/icons/Clear';
import { selectTrip } from '../../Slices/TimelineStateSlice';
import DeleteTripDialog from './DeleteTripDialog';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	overrideText: {
		textDecoration: 'none'
	}
});

const HomeTimelines = ({ trip }) => {
	const classes = useStyles();

	const [ showDialog, setShowDialog ] = useState(false);
	const dispatch = useDispatch();
	return (
		<React.Fragment>
			<Box
				display="flex"
				boxSizing="border-box"
				height="80%"
				flexDirection="column"
				alignItems="center"
				borderRadius="10px"
				boxShadow={3}
				height="560px"
				overflow="hidden"
				m={1}
			>
				<Box display="flex" width="100%" flexDirection="column" flexShrink="1" flexBasis="15%">
					<Box alignSelf="flex-end">
						<Button onClick={() => setShowDialog(true)}>
							<ClearIcon />
						</Button>
					</Box>
					<Link
						className={classes.overrideText}
						to="/edit_trip"
						onClick={() => {
							dispatch(selectTrip(trip.id));
						}}
					>
						<Typography align="center" variant="h2">
							{truncate(trip.name, 12)}
						</Typography>
					</Link>
				</Box>
				<Link
					className={classes.overrideText}
					to="/edit_trip"
					onClick={() => {
						dispatch(selectTrip(trip.id));
					}}
				>
					<VisualTimeline trip={trip} />
				</Link>
			</Box>

			<DeleteTripDialog trip={trip} showDialog={showDialog} setShowDialog={setShowDialog} />
		</React.Fragment>
	);
};

export default HomeTimelines;
