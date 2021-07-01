import React from 'react';
import DetailHeaderPicture from './DetailHeaderPicture';
import NewDetailHeader from './DetailHeader/NewDetailHeader';
import SavedDetailHeader from './DetailHeader/SavedDetailHeader';
import NewDetailBody from './DetailBody/NewDetailBody';
import SavedDetailBody from './DetailBody/SavedDetailBody';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

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
const DetailComp = ({ collapseTimeline }) => {
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
					{/* <NewDetailHeader collapseTimeline={collapseTimeline} /> */}
					<SavedDetailHeader collapseTimeline={collapseTimeline} />
					{/* <NewDetailBody collapseTimeline={collapseTimeline} /> */}
					<SavedDetailBody collapseTimeline={collapseTimeline} />
				</Box>
			</div>
		</React.Fragment>
	);
};

export default DetailComp;
