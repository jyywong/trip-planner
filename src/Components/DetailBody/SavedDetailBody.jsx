import React from 'react';
import { motion } from 'framer-motion';
import { openDetails } from '../../Slices/TimelineStateSlice';
import { openSuggestions } from '../../Slices/TimelineStateSlice';
import { useDispatch } from 'react-redux';
import { Typography, Box, Button } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { displayOnlyIfTimelineStateIsNotTimelineOnly } from '../../HelperFunction';
const SavedDetailBody = ({ timelineState, selectedItem, stop }) => {
	const dispatch = useDispatch();
	return (
		<React.Fragment>
			<Box
				display={displayOnlyIfTimelineStateIsNotTimelineOnly(timelineState)}
				flexBasis="100%"
				flexDirection="column"
				justifyContent="space-between"
				padding={4}
				component={motion.div}
				layout
			>
				<Typography variant="body1">{selectedItem !== 0 && stop.details.body}</Typography>
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
