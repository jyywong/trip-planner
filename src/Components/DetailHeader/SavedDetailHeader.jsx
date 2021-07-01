import React from 'react';
import DetailHeaderBase from './DetailHeaderBase';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	h3White: {
		color: 'white'
	},
	h5White: {
		marginLeft: '1rem',
		color: 'white'
	},
	h6White: {
		color: 'white'
	},
	whiteSVG: {
		color: 'white'
	}
});
const SavedDetailHeader = ({ collapseTimeline }) => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<DetailHeaderBase collapseTimeline={collapseTimeline}>
				<Box display="flex" alignItems="flex-end" width="100%">
					<Typography className={classes.h3White} variant="h3">
						Title
					</Typography>
					<Typography className={classes.h5White} variant="h5">
						6:30am
					</Typography>
					<Box display="flex" marginLeft="auto">
						<EditLocationIcon className={classes.whiteSVG} />
						<Typography className={classes.h6White} variant="h6">
							Location
						</Typography>
					</Box>
				</Box>
			</DetailHeaderBase>
		</React.Fragment>
	);
};

export default SavedDetailHeader;
