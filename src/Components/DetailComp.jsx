import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openSuggestions } from '../Slices/TimelineStateSlice';
import DetailHeaderPicture from './DetailHeaderPicture';
import NewDetailHeader from './DetailHeader/NewDetailHeader';
import SavedDetailHeader from './DetailHeader/SavedDetailHeader';
import NewDetailBody from './DetailBody/NewDetailBody';
import SavedDetailBase from './DetailBody/SavedDetailBase';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import NewStopFormComp from './NewStopFormComp';
import { displayOnlyIfTimelineStateIsNotTimelineOnly, timelineStateComparer } from '../HelperFunction';

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
		display: 'flex'
	},
	middleGrid: {
		gridColumn: '4/7',
		visibility: 'visible',
		gridRow: '1/2',
		display: 'flex'
	}
});
const DetailComp = () => {
	const dispatch = useDispatch();
	const timelineState = useSelector((state) => state.timelineState);
	const UIMode = useSelector((state) => state.UIState.mode);
	const classes = useStyles();
	return (
		<React.Fragment>
			<div
				className={timelineStateComparer(
					timelineState,
					classes.collapsedGrid,
					classes.expandGrid,
					classes.middleGrid
				)}
			>
				<Box
					display="flex"
					flexGrow="1"
					flexDirection="column"
					alignItems="center"
					borderRadius="10px"
					m={1}
					boxShadow={3}
				>
					<DetailHeaderPicture timelineState={timelineState} />
					<Box display={displayOnlyIfTimelineStateIsNotTimelineOnly(timelineState)}>
						<Button
							onClick={() => {
								dispatch(openSuggestions());
							}}
						>
							Suggestions
						</Button>
					</Box>

					{UIMode === 'Detail' ? (
						<React.Fragment>
							<SavedDetailHeader timelineState={timelineState} />
							<SavedDetailBase timelineState={timelineState} />
						</React.Fragment>
					) : (
						<React.Fragment>
							<NewStopFormComp timelineState={timelineState} />
						</React.Fragment>
					)}
				</Box>
			</div>
		</React.Fragment>
	);
};

export default DetailComp;
