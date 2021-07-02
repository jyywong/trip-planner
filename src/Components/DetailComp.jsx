import React from 'react';
import { useSelector } from 'react-redux';
import DetailHeaderPicture from './DetailHeaderPicture';
import NewDetailHeader from './DetailHeader/NewDetailHeader';
import SavedDetailHeader from './DetailHeader/SavedDetailHeader';
import NewDetailBody from './DetailBody/NewDetailBody';
import SavedDetailBase from './DetailBody/SavedDetailBase';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import NewStopFormComp from './NewStopFormComp';

const useStyles = makeStyles({
	expandGrid: {
		gridColumn: '4/9',
		visibility: 'visible',
		gridRow: '1/2'
	},
	collapsedGrid: {
		gridColumn: '9/9',
		gridRow: '1/2',
		visibility: 'hidden'
	}
});
const DetailComp = () => {
	const collapseTimeline = useSelector((state) => state.timelineExpand);
	const UIMode = useSelector((state) => state.UIState.mode);
	const classes = useStyles();
	return (
		<React.Fragment>
			<div className={collapseTimeline ? classes.expandGrid : classes.collapsedGrid}>
				<Box
					display="flex"
					flexDirection="column"
					height="100%"
					alignItems="center"
					borderRadius="10px"
					m={1}
					boxShadow={3}
				>
					<DetailHeaderPicture collapseTimeline={collapseTimeline} />
					{UIMode === 'Detail' ? (
						<React.Fragment>
							<SavedDetailHeader collapseTimeline={collapseTimeline} />
							<SavedDetailBase collapseTimeline={collapseTimeline} />
						</React.Fragment>
					) : (
						<React.Fragment>
							<NewStopFormComp collapseTimeline={collapseTimeline} />
						</React.Fragment>
					)}
				</Box>
			</div>
		</React.Fragment>
	);
};

export default DetailComp;
