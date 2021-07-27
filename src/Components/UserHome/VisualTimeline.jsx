import React from 'react';
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
import { useGetTripEventsQuery } from '../../Services/tripPlannerBackend';

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
const VisualTimeline = ({ trip }) => {
	const { data, error, isLoading } = useGetTripEventsQuery(trip.id);
	const classes = useStyles();

	return (
		<React.Fragment>
			<Box className={classes.root} width="100%" flexGrow="1" overflow="auto" minHeight="0">
				<Timeline align="alternate">
					{!isLoading &&
						!error &&
						data
							.slice(0, 3)
							.map((item) => (
								<VisualTimelineBlock
									key={item.id}
									id={item.id}
									time={item.time}
									name={item.name}
									details={item.details}
								/>
							))}
					{/* Uncommenting below will fix alignment issues */}
					<TimelineItem className={classes.invisible}>
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
					</TimelineItem>
				</Timeline>
			</Box>
		</React.Fragment>
	);
};

export default VisualTimeline;
