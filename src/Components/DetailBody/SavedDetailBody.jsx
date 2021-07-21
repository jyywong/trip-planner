import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { openDetails } from '../../Slices/TimelineStateSlice';
import { openSuggestions } from '../../Slices/TimelineStateSlice';
import { useDispatch } from 'react-redux';
import { Typography, Box, Button } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { displayOnlyIfTimelineStateIsNotTimelineOnly } from '../../HelperFunction';
const SavedDetailBody = ({ timelineState, tripEvent }) => {
	const { details } = tripEvent;
	const controls = useAnimation();
	const dispatch = useDispatch();

	useEffect(
		() => {
			controls.start({ x: [ -100, 0 ], opacity: [ 0, 1 ] });
		},
		[ tripEvent ]
	);
	return (
		<React.Fragment>
			<Box
				display={displayOnlyIfTimelineStateIsNotTimelineOnly(timelineState)}
				flexBasis="100%"
				flexDirection="column"
				justifyContent="space-between"
				padding={4}
				overflow="hidden"
				component={motion.div}
				layout
			>
				<Box component={motion.div} animate={controls} initial={{ x: -100 }}>
					<Typography variant="body1">{details}</Typography>
				</Box>
				<Box alignSelf="flex-end">
					<Button
						endIcon={<ChevronRightIcon fontSize="large" />}
						onClick={() => {
							timelineState === 'TIMELINE_DETAILS'
								? dispatch(openSuggestions())
								: dispatch(openDetails());
						}}
					>
						Suggestions
					</Button>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default SavedDetailBody;
