import React, { forwardRef } from 'react';
import { parseISO, format } from 'date-fns';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { changeModeToDetail } from '../../Slices/UISlice';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { selectStop } from '../../Slices/TripStopSlice';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Paper from '@material-ui/core/Paper';
import { openDetails } from '../../Slices/TimelineStateSlice';

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: '6px 16px',
		cursor: 'pointer'
	},
	highlightedContainer: {
		padding: '6px 16px',
		border: '1px solid blue'
	}
}));
const TimelineBlock = forwardRef(({ id, time, name, details }, ref) => {
	const selectedItem = useSelector((state) => state.tripStop.selectedStop);
	const timelineExpand = useSelector((state) => state.timelineExpand);
	const uiMode = useSelector((state) => state.UIState.mode);
	const dispatch = useDispatch();
	const classes = useStyles();
	return (
		<React.Fragment>
			<TimelineItem ref={ref}>
				<TimelineOppositeContent>
					<Typography variant="body2" color="textSecondary">
						{format(parseISO(time), 'h:mmaaa')}
					</Typography>
				</TimelineOppositeContent>

				<TimelineSeparator>
					<TimelineDot>
						<FastfoodIcon />
					</TimelineDot>
					<TimelineConnector />
				</TimelineSeparator>
				<TimelineContent
					onClick={() => {
						dispatch(selectStop(id));
						dispatch(changeModeToDetail());
						if (!timelineExpand) {
							dispatch(openDetails());
						}
					}}
				>
					<Paper
						elevation={3}
						className={
							uiMode === 'Detail' && selectedItem === id ? classes.highlightedContainer : classes.paper
						}
					>
						<Typography variant="h6" component="h1">
							{name}
						</Typography>
						<Typography>{details} </Typography>
					</Paper>
				</TimelineContent>
			</TimelineItem>
		</React.Fragment>
	);
});

export default TimelineBlock;

export const MotionTimelineBlock = motion(TimelineBlock, { forwardMotionProps: true });
