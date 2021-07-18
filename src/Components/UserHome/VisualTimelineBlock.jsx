import React from 'react';
import { parseISO, format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
	paper: {
		padding: '6px 16px',
		cursor: 'pointer'
	}
}));
const VisualTimelineBlock = () => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<TimelineItem>
				<TimelineOppositeContent>
					<Typography variant="body2" color="textSecondary">
						{/* {format(parseISO(time), 'h:mmaaa')} */}
						time
					</Typography>
				</TimelineOppositeContent>

				<TimelineSeparator>
					<TimelineDot>
						<FastfoodIcon />
					</TimelineDot>
					<TimelineConnector />
				</TimelineSeparator>
				<TimelineContent>
					<Paper elevation={3} className={classes.paper}>
						<Typography variant="h6" component="h1">
							hello
						</Typography>
						<Typography>hello</Typography>
					</Paper>
				</TimelineContent>
			</TimelineItem>
		</React.Fragment>
	);
};

export default VisualTimelineBlock;
