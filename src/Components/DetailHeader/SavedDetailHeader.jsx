import React from 'react';
import { format, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import DetailHeaderBase from './DetailHeaderBase';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	h3White: {
		color: 'white'
	},
	h5White: {
		marginLeft: '1rem',
		color: 'white'
	},
	h6White: {
		color: 'white'
	},
	whiteSVG: {
		color: 'white'
	}
});
const SavedDetailHeader = ({ collapseTimeline }) => {
	const selectedItem = useSelector((state) => state.tripStop.selectedStop);
	const stop = useSelector((state) => state.tripStop.stops.find((stop) => stop.id === selectedItem));
	const classes = useStyles();
	return (
		<React.Fragment>
			<DetailHeaderBase collapseTimeline={collapseTimeline}>
				<Box display="flex" alignItems="flex-end" width="100%">
					<Typography className={classes.h3White} variant="h3">
						{selectedItem !== 0 && stop.details.title}
					</Typography>
					<Typography className={classes.h5White} variant="h5">
						{selectedItem !== 0 && format(parseISO(stop.time), 'h:mmaaa')}
					</Typography>
					<Box display="flex" marginLeft="auto">
						<EditLocationIcon className={classes.whiteSVG} />
						<Typography className={classes.h6White} variant="h6">
							Location
						</Typography>
					</Box>
				</Box>
			</DetailHeaderBase>
		</React.Fragment>
	);
};

export default SavedDetailHeader;
