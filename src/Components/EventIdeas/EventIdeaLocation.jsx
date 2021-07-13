import React from 'react';
import { Box, Typography, Chip } from '@material-ui/core';
const EventIdeaLocation = ({ location }) => {
	return (
		<React.Fragment>
			<Box flexBasis="40%">
				<Typography variant="body1">Location: </Typography>
				<Box padding={1}>
					<Typography variant="h5">{location.name}</Typography>
					<Typography variant="body1">{location.address}</Typography>
					{/* <Box marginTop={1}>
						<Chip label="hello" />
						<Chip label="hello" />
						<Chip label="hello" />
					</Box> */}
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default EventIdeaLocation;
