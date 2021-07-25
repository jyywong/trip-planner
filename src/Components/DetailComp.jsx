import React from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import DetailHeaderPicture from './DetailHeaderPicture';
import SavedDetailHeader from './DetailHeader/SavedDetailHeader';
import SavedDetailBase from './DetailBody/SavedDetailBase';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import NewStopFormComp from './NewStopFormComp';
import { displayOnlyIfTimelineStateIsNotTimelineOnly, timelineStateComparer } from '../HelperFunction';
import { timelineModeSelector, timelineSelectedTrip } from '../Slices/TimelineStateSlice';
import { useGetATripEventQuery } from '../Services/tripPlannerBackend';

const useStyles = makeStyles({
	collapsedGrid: {
		gridColumn: '9/9',
		gridRow: '1/2',
		visibility: 'hidden',
		display: 'flex'
	},
	expandGrid: {
		gridColumn: '4/9',
		visibility: 'visible',
		gridRow: '1/2',
		display: 'flex',
		maxHeight: '100vh',
		overflow: 'hidden'
	},
	middleGrid: {
		gridColumn: '4/7',
		visibility: 'visible',
		gridRow: '1/2',
		display: 'flex',
		maxHeight: '100vh',
		overflow: 'hidden'
	}
});
const DetailComp = () => {
	const selectedItem = useSelector((state) => state.tripStop.selectedStop);
	const { data, error, isLoading } = useGetATripEventQuery(selectedItem);
	const timelineState = useSelector(timelineModeSelector);
	const UIMode = useSelector((state) => state.UIState.mode);
	const classes = useStyles();
	return (
		<AnimatePresence>
			{(timelineState === 'TIMELINE_DETAILS' || timelineState === 'TIMELINE_DETAILS_SUGGESTIONS') && (
				<React.Fragment>
					<motion.div
						className={timelineStateComparer(
							timelineState,
							classes.collapsedGrid,
							classes.expandGrid,
							classes.middleGrid,
							classes.collapsedGrid
						)}
						animate={{
							x: 0
						}}
						initial={{
							x: 1200
						}}
						exit={{
							x: 1500
						}}
						transition={{
							type: 'spring',
							stiffness: 50,
							mass: 0.8
						}}
						layout
					>
						<Box
							display={displayOnlyIfTimelineStateIsNotTimelineOnly(timelineState)}
							flexGrow="1"
							flexDirection="column"
							alignItems="center"
							borderRadius="10px"
							m={1}
							boxShadow={3}
							component={motion.div}
							layout
						>
							<DetailHeaderPicture timelineState={timelineState} />

							{UIMode === 'Detail' ? (
								!isLoading &&
								!error && (
									<React.Fragment>
										<SavedDetailHeader tripEvent={data} timelineState={timelineState} />
										<SavedDetailBase tripEvent={data} timelineState={timelineState} />
									</React.Fragment>
								)
							) : (
								<NewStopFormComp timelineState={timelineState} />
							)}
						</Box>
					</motion.div>
				</React.Fragment>
			)}
		</AnimatePresence>
	);
};

export default DetailComp;
