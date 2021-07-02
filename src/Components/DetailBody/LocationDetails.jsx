import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const LocationDetails = () => {
	return (
		<React.Fragment>
			<Box display="flex" flexDirection="column">
				<Typography variant="h4"> Cafe Badilico</Typography>
				<Box display="flex" alignItems="flex-end" mb={2}>
					<Rating name="read-only" value={3} readOnly />
					<Box ml={1}>
						<Typography variant="caption">3 (415)</Typography>
					</Box>
				</Box>
				<Typography variant="body1">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. A esse odio laboriosam. Nemo commodi
					impedit eligendi reprehenderit explicabo consequuntur quisquam cumque, quod sapiente nulla! Quia
					pariatur dolor explicabo autem ea.
				</Typography>
			</Box>
		</React.Fragment>
	);
};

export default LocationDetails;
