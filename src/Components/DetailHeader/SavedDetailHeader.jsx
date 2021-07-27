import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import DetailHeaderBase from './DetailHeaderBase';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import { Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { returnToTimelineOnly } from '../../Slices/TimelineStateSlice';
import { useDeleteTripEventMutation } from '../../Services/tripPlannerBackend';

const useStyles = makeStyles({
	button: {
		color: 'white',
		border: '1px solid rgb(228, 228, 228)'
	},
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
const SavedDetailHeader = ({ tripEvent, timelineState }) => {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const [ deleteEvent, { isSuccess, isError } ] = useDeleteTripEventMutation();
	const { time, name, details, address } = tripEvent;
	const controls = useAnimation();
	const selectedItem = useSelector((state) => state.tripStop.selectedStop);
	const stop = useSelector((state) => state.tripStop.stops.find((stop) => stop.id === selectedItem));
	const classes = useStyles();

	const handleDelete = () => {
		deleteEvent(tripEvent.id);
		dispatch(returnToTimelineOnly());
	};

	useEffect(
		() => {
			if (isSuccess) {
				enqueueSnackbar('Successfully deleted trip event', { variant: 'success' });
			} else if (isError) {
				enqueueSnackbar('Unable to delete trip event', { variant: 'error' });
			}
		},
		[ isSuccess, isError ]
	);

	useEffect(
		() => {
			controls.start({ x: [ -100, 0 ], opacity: [ 0, 1 ] });
		},
		[ stop ]
	);
	return (
		<React.Fragment>
			<DetailHeaderBase timelineState={timelineState}>
				<Box
					display="flex"
					alignItems="flex-end"
					width="100%"
					component={motion.div}
					animate={controls}
					initial={{ x: -100 }}
					flexDirection="column"
				>
					<Box display="flex" marginRight={-2}>
						<Button
							className={classes.button}
							variant="outlined"
							endIcon={<ClearIcon />}
							onClick={handleDelete}
						>
							Delete Event
						</Button>
					</Box>
					<Box display="flex" width="100%" alignItems="flex-end">
						<Typography className={classes.h3White} variant="h3">
							{name}
						</Typography>
						<Typography className={classes.h5White} variant="h5">
							{format(parseISO(time), 'h:mmaaa')}
						</Typography>
						<Box display="flex" marginLeft="auto">
							<EditLocationIcon className={classes.whiteSVG} />
							<Typography className={classes.h6White} variant="h6">
								Location
							</Typography>
						</Box>
					</Box>
				</Box>
			</DetailHeaderBase>
		</React.Fragment>
	);
};

export default SavedDetailHeader;
