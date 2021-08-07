import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { LMobileMQ } from '../../HelperFunction';
import { parseISO, format } from 'date-fns';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { truncate } from '../../HelperFunction';
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
	},
	oppositeOverride: {
		flexGrow: '0'
	}
}));
const VisualTimelineBlock = ({ time, name, details }) => {
	const classes = useStyles();
	const LMobile = useMediaQuery(LMobileMQ);

	return (
		<React.Fragment>
			<TimelineItem>
				<TimelineOppositeContent className={LMobile ? classes.oppositeOverride : ''}>
					<Typography variant="body2" color="textSecondary">
						{format(parseISO(time), 'h:mmaaa')}
					</Typography>
				</TimelineOppositeContent>

				<TimelineSeparator>
					<TimelineDot>{!LMobile && <FastfoodIcon />}</TimelineDot>
					<TimelineConnector />
				</TimelineSeparator>
				<TimelineContent>
					<Paper elevation={3} className={classes.paper}>
						<Typography variant="h6" component="h1">
							{truncate(name, 10)}
						</Typography>
						<Typography>{truncate(details, 10)}</Typography>
					</Paper>
				</TimelineContent>
			</TimelineItem>
		</React.Fragment>
	);
};

export default VisualTimelineBlock;
