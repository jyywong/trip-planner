import React from 'react';
import { Typography } from '@material-ui/core';
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
		padding: '6px 16px'
	}
}));
const TimelineBlock = ({ time, details }) => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<TimelineItem>
				<TimelineOppositeContent>
					<Typography variant="body2" color="textSecondary">
						9:30 am
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
							Eat
						</Typography>
						<Typography>Because you need strength</Typography>
					</Paper>
				</TimelineContent>
			</TimelineItem>
		</React.Fragment>
	);
};

export default TimelineBlock;
