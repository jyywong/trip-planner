import React from 'react';
import { Box, Typography } from '@material-ui/core';
const EventIdeaLocation = ({ location }) => {
	return (
		<React.Fragment>
			<Box flexBasis="40%">
				<Typography variant="body1">Location: </Typography>
				<Box padding={1}>
					<Typography variant="h5">{location.locationName}</Typography>
					<Typography variant="body1">{location.address}</Typography>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default EventIdeaLocation;
