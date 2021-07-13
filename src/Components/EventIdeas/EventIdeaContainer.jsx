import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { displayOnlyIfTimelineStateIsTimelineDetailsSuggestions, timelineStateComparer } from '../../HelperFunction';
import EventIdea from './EventIdea';

const useStyles = makeStyles({
	collapsedGrid: {
		gridColumn: '9/9',
		gridRow: '1/2',
		visibility: 'hidden',
		opacity: '0',
		display: 'flex',
		minHeight: '0'
	},
	openEventIdeas: {
		gridColumn: '5/9',
		gridRow: '1/2',
		visibility: 'visible',
		display: 'flex',
		minHeight: '0'
	},
	whiteText: {
		color: 'white'
	},
	scrollbar: {
		'&::-webkit-scrollbar': {
			width: '14px'
		},
		'&::-webkit-scrollbar-track': {
			background: 'transparent'
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: '#a3a3a3',
			borderRadius: '10px',
			border: '4px solid #f2f2f2'
		}
	}
});

const EventIdeaContainer = () => {
	const timelineState = useSelector((state) => state.timelineState);
	const eventIdeas = useSelector((state) => Object.values(state.eventIdeas.byID));
	const classes = useStyles();

	return (
		<React.Fragment>
			<div
				className={timelineStateComparer(
					timelineState,
					classes.collapsedGrid,
					classes.collapsedGrid,
					classes.collapsedGrid,
					classes.openEventIdeas
				)}
			>
				<Box
					display={timelineState === 'TIMELINE_EVENT_IDEAS' ? 'flex' : 'none'}
					flexGrow="1"
					boxSizing="border-box"
					flexDirection="column"
					alignItems="center"
					borderRadius="10px"
					boxShadow={3}
					overflow="hidden"
					m={1}
					minHeight="0"
				>
					<Box
						boxSizing="border-box"
						display="flex"
						paddingX={3}
						paddingBottom={1}
						alignItems="flex-end"
						justifyContent="space-between"
						flexBasis="10%"
						width="100%"
						bgcolor="#c4c4c4"
					>
						<Typography className={classes.whiteText} variant="h4">
							Event Ideas
						</Typography>
					</Box>
					<Box
						className={classes.scrollbar}
						display="flex"
						overflow="auto"
						flexDirection="column"
						alignItems="center"
						width="100%"
						height="100%"
						minHeight="0"
					>
						{eventIdeas.map((eventIdea) => <EventIdea key={eventIdea.id} eventIdea={eventIdea} />)}
					</Box>
				</Box>
			</div>
		</React.Fragment>
	);
};

export default EventIdeaContainer;
