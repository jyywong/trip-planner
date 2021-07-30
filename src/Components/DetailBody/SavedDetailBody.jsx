import React, { useEffect } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { TabletMQ } from '../../HelperFunction';
import { motion, useAnimation } from 'framer-motion';
import { openDetails, returnToTimelineOnly } from '../../Slices/TimelineStateSlice';
import { openSuggestions } from '../../Slices/TimelineStateSlice';
import { useDispatch } from 'react-redux';
import { Typography, Box, Button } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { displayOnlyIfTimelineStateIsNotTimelineOnly } from '../../HelperFunction';
const SavedDetailBody = ({ timelineState, tripEvent }) => {
	const tablet = useMediaQuery(TabletMQ);

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
				<Box
					display={tablet ? 'flex' : ''}
					justifyContent={tablet ? 'space-between' : ''}
					alignSelf={tablet ? '' : 'flex-end'}
				>
					{tablet && (
						<Button
							startIcon={<ChevronLeftIcon fontSize="large" />}
							onClick={() => {
								dispatch(returnToTimelineOnly());
							}}
						>
							Timeline
						</Button>
					)}
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
