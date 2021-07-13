import React from 'react';
import { Box, Typography } from '@material-ui/core';
const EventIdeaDetails = ({ details }) => {
	return (
		<React.Fragment>
			<Box flexBasis="40%">
				<Typography variant="body1">Details: </Typography>
				<Box padding={1}>
					<Typography variant="body2">{details}</Typography>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default EventIdeaDetails;
