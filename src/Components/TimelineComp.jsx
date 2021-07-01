import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import TimelineBlock from './Timeline/TimelineBlock';
const useStyles = makeStyles((theme) => ({
	paper: {
		padding: '6px 16px'
	},
	secondaryTail: {
		backgroundColor: theme.palette.secondary.main
	},
	invisible: {
		visibility: 'hidden'
	},
	addCircle: {
		padding: '.8rem',
		backgroundColor: '#81c784',
		cursor: 'pointer',
		transition: 'all .4s',
		boxShadow:
			'0px 5px 1px -2px rgb(0 0 0 / 20%), 0px 4px 2px 0px rgb(0 0 0 / 14%), 0px 3px 5px 0px rgb(0 0 0 / 12%);',
		'&:hover': {
			boxShadow:
				'0px 7px 1px -2px rgb(0 0 0 / 20%), 0px 6px 2px 0px rgb(0 0 0 / 14%), 0px 5px 5px 0px rgb(0 0 0 / 12%);'
		},
		'&:active': {
			boxShadow:
				'0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);'
		}
	}
}));
const TimelineComp = ({ collapseTimeline, setCollapseTimeline }) => {
	const classes = useStyles();
	const TLItems = [
		{
			id: 1,
			time: '9:30am',
			details: {
				title: 'Eat',
				body: 'Because you need strength'
			}
		},
		{
			id: 2,
			time: '10:00am',
			details: {
				title: 'Code',
				body: "Because it's awesome"
			}
		},
		{
			id: 3,
			time: '7:00pm',
			details: {
				title: 'Sleep',
				body: 'Because you need rest'
			}
		},
		{
			id: 4,
			time: '9:30am',
			details: {
				title: 'Repeat',
				body: 'Because this is the life you love'
			}
		}
	];
	return (
		<React.Fragment>
			<Timeline align="alternate">
				{/* <TimelineItem>
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
				<TimelineItem>
					<TimelineOppositeContent>
						<Typography variant="body2" color="textSecondary">
							10:00 am
						</Typography>
					</TimelineOppositeContent>
					<TimelineSeparator>
						<TimelineDot color="primary">
							<LaptopMacIcon />
						</TimelineDot>
						<TimelineConnector />
					</TimelineSeparator>
					<TimelineContent>
						<Paper elevation={3} className={classes.paper}>
							<Typography variant="h6" component="h1">
								Code
							</Typography>
							<Typography>Because it&apos;s awesome!</Typography>
						</Paper>
					</TimelineContent>
				</TimelineItem>
				<TimelineItem>
					<TimelineSeparator>
						<TimelineDot color="primary" variant="outlined">
							<HotelIcon />
						</TimelineDot>
						<TimelineConnector className={classes.secondaryTail} />
					</TimelineSeparator>
					<TimelineContent>
						<Paper elevation={3} className={classes.paper}>
							<Typography variant="h6" component="h1">
								Sleep
							</Typography>
							<Typography>Because you need rest</Typography>
						</Paper>
					</TimelineContent>
				</TimelineItem>
				<TimelineItem>
					<TimelineSeparator>
						<TimelineDot color="secondary">
							<RepeatIcon />
						</TimelineDot>
						<TimelineConnector className={classes.secondaryTail} />
					</TimelineSeparator>
					<TimelineContent>
						<Paper elevation={3} className={classes.paper}>
							<Typography variant="h6" component="h1">
								Repeat
							</Typography>
							<Typography>Because this is the life you love!</Typography>
						</Paper>
					</TimelineContent>
				</TimelineItem> */}
				{TLItems.map((item) => {
					console.log(item);
					return <TimelineBlock key={item.id} time={item.time} details={item.details} />;
				})}
				<TimelineItem>
					<TimelineSeparator>
						<TimelineDot
							className={classes.addCircle}
							color="secondary"
							onClick={() => {
								setCollapseTimeline(!collapseTimeline);
							}}
						>
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
		</React.Fragment>
	);
};

export default TimelineComp;
