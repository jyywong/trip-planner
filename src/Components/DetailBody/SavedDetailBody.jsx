import React from 'react';
import { Typography, Box } from '@material-ui/core';
const SavedDetailBody = ({ collapseTimeline, selectedItem, classes, stop }) => {
	return (
		<React.Fragment>
			<Box padding={4}>
				<Typography className={collapseTimeline ? classes.display : classes.noDisplay} variant="body1">
					{selectedItem !== 0 && stop.details.body}
				</Typography>
			</Box>
		</React.Fragment>
	);
};

export default SavedDetailBody;
