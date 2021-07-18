import React from 'react';
import { useSelector } from 'react-redux';
import parseISO from 'date-fns/parseISO';
import { compareAsc } from 'date-fns';
import { Box, Typography } from '@material-ui/core';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import VisualTimelineBlock from './VisualTimelineBlock';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: '6px 16px'
	},
	secondaryTail: {
		backgroundColor: theme.palette.secondary.main
	},
	invisible: {
		visibility: 'hidden'
	}
}));
const VisualTimeline = () => {
	const classes = useStyles();
	const tripStops = useSelector((state) => state.tripStop.stops);
	const unFrozenTripStops = [ ...tripStops ];
	const sortTripStopsByTime = (unFrozenTripStops) =>
		unFrozenTripStops.sort((a, b) => compareAsc(parseISO(a.time), parseISO(b.time)));
	const sortedTripStops = sortTripStopsByTime(unFrozenTripStops);

	return (
		<React.Fragment>
			<Box className={classes.root} flexBasis="70%" width="100%" flexGrow="0" overflow="auto" minHeight="0">
				<Timeline align="alternate">
					{sortedTripStops.map((item) => (
						<VisualTimelineBlock key={item.id} id={item.id} time={item.time} details={item.details} />
					))}
					{/* <TimelineItem>
						<TimelineSeparator>
							<TimelineDot className={classes.addCircle} color="secondary">
								<AddIcon />
							</TimelineDot>
						</TimelineSeparator>
						<TimelineContent className={classes.invisible}>
							<Paper elevation={3} className={classes.paper}>
								<Typography variant="h6" component="h1">
									Repeat
								</Typography>
								<Typography>Because this is the life you love!</Typography>
							</Paper>
						</TimelineContent>
					</TimelineItem> */}
				</Timeline>
			</Box>
		</React.Fragment>
	);
};

export default VisualTimeline;
