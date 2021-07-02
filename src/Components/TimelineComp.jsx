import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeModeToAdd } from '../Slices/UISlice';
import { collapseTimeline } from '../Slices/TimelineStateSlice';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
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
const TimelineComp = ({ selectedItem, setSelectedItem }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const tripStops = useSelector((state) => state.tripStop.stops);

	return (
		<React.Fragment>
			<Timeline align="alternate">
				{tripStops.map((item) => (
					<TimelineBlock
						key={item.id}
						id={item.id}
						selectedItem={selectedItem}
						setSelectedItem={setSelectedItem}
						time={item.time}
						details={item.details}
					/>
				))}
				<TimelineItem>
					<TimelineSeparator>
						<TimelineDot
							className={classes.addCircle}
							color="secondary"
							onClick={() => {
								dispatch(collapseTimeline());
								dispatch(changeModeToAdd());
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
