import React from 'react';
import { useSelector } from 'react-redux';
import DetailHeaderPicture from './DetailHeaderPicture';
import SavedDetailHeader from './DetailHeader/SavedDetailHeader';
import SavedDetailBase from './DetailBody/SavedDetailBase';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import NewStopFormComp from './NewStopFormComp';
import { timelineStateComparer } from '../HelperFunction';

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
