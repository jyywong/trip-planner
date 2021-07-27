import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useGetATripQuery, useGetTripEventsQuery } from '../Services/tripPlannerBackend';
import { Box, Typography, Button } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TimelineComp from './TimelineComp';
import { makeStyles } from '@material-ui/core/styles';

import { timelineStateComparer } from '../HelperFunction';
import {
	openEventIdeas,
	openMembersList,
	returnToTimelineOnly,
	timelineModeSelector,
	timelineSelectedTrip
} from '../Slices/TimelineStateSlice';

const useStyles = makeStyles((theme) => ({
	expandGrid: {
		gridColumn: '1/9',
		gridRow: '1/2',
		display: 'flex',
		minHeight: '0'
	},
	collapsedGrid: {
		gridColumn: '1/4',
		gridRow: '1/2',
		display: 'flex',
		minHeight: '0'
	},
	halfGrid: {
		gridColumn: '1/5',
		gridRow: '1/2',
		display: 'flex',
		minHeight: '0'
	},
	rightGrid: {
		gridColumn: '5/9',
		gridRow: '1/2',
		display: 'flex',
		minHeight: '0'
	},
	root: {
		'&::-webkit-scrollbar': {
			width: '16px'
		},
		'&::-webkit-scrollbar-track': {
			background: 'transparent'
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: '#a3a3a3',
			borderRadius: '10px',
			border: '5px solid #f2f2f2'
		}
	}
}));
const TimelineContainer = () => {
	const dispatch = useDispatch();
	const selectedTrip = useSelector(timelineSelectedTrip);
	const { data: tripData, error: tripError, isLoading: tripIsLoading } = useGetATripQuery(selectedTrip);
	const [ selectedItem, setSelectedItem ] = useState({});
	const timelineState = useSelector(timelineModeSelector);
	const classes = useStyles();
	return (
		<React.Fragment>
			<motion.div
				className={timelineStateComparer(
					timelineState,
					classes.expandGrid,
					classes.collapsedGrid,
					classes.collapsedGrid,
					classes.halfGrid,
					classes.rightGrid
				)}
				layout
			>
				<Box
					display="flex"
					flexGrow="1"
					boxSizing="border-box"
					flexDirection="column"
					alignItems="center"
					borderRadius="10px"
					boxShadow={3}
					overflow="hidden"
					m={1}
					minHeight="0"
					component={motion.div}
					layout
				>
					<Box display="flex" flexShrink="1" marginTop={2} flexBasis="15%" component={motion.div} layout>
						{!tripIsLoading && !tripError && <Typography variant="h2">{tripData.name}</Typography>}
					</Box>
					<Box
						className={classes.root}
						flexBasis="70%"
						flexGrow="0"
						overflow="auto"
						minHeight="0"
						component={motion.div}
						layout
					>
						<TimelineComp selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
					</Box>
					<Box display="flex">
						<Button
							startIcon={<ChevronLeftIcon fontSize="large" />}
							onClick={() => {
								timelineState !== 'MEMBERS_TIMELINE'
									? dispatch(openMembersList())
									: dispatch(returnToTimelineOnly());
							}}
							component={motion.div}
							layout
						>
							Manage Members
						</Button>
						<Button
							endIcon={<ChevronRightIcon fontSize="large" />}
							onClick={() => {
								timelineState !== 'TIMELINE_EVENT_IDEAS'
									? dispatch(openEventIdeas())
									: dispatch(returnToTimelineOnly());
							}}
							component={motion.div}
							layout
						>
							Other Ideas
						</Button>
					</Box>
				</Box>
			</motion.div>
		</React.Fragment>
	);
};

export default TimelineContainer;
