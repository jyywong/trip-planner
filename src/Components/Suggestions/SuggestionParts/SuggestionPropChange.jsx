import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	crossedOutOverride: {
		textDecoration: 'line-through'
	}
}));

const SuggestionPropChange = ({ suggestion }) => {
	const classes = useStyles();
	// const selectedStopID = useSelector((state) => state.tripStop.selectedStop);
	// const selectedStop = useSelector((state) => state.tripStop.stops.find((stop) => stop.id === selectedStopID));
	return (
		<React.Fragment>
			<Box display="flex" flexDirection="column" marginTop={1}>
				<Typography variant="overline">Proposed: </Typography>
				<Box display="flex" flexDirection="column" alignItems="center">
					<Typography className={classes.crossedOutOverride} variant="body1">
						Current Name
					</Typography>
					<ArrowDownwardIcon />
					<Typography variant="body1">{suggestion.name}</Typography>
				</Box>
				<Typography variant="overline">Reason: </Typography>
				<Box paddingX={3}>
					<Typography variant="body2">{suggestion.details}</Typography>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default SuggestionPropChange;
