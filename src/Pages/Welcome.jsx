import React from 'react';
import { Typography, Box, Button } from '@material-ui/core';

const Welcome = () => {
	return (
		<React.Fragment>
			<Box
				display="flex"
				width="100vw"
				height="100vh"
				alignItems="center"
				justifyContent="center"
				flexDirection="column"
			>
				<Typography variant="h1">Trip Planner</Typography>
				<div style={{ display: 'flex', justifyContent: 'space-evenly', width: '30%' }}>
					<Box width="40%">
						<Button variant="contained" color="default" mr="auto" fullWidth>
							New trip
						</Button>
					</Box>

					<Box width="40%">
						<Button variant="contained" color="primary" fullWidth>
							Log In
						</Button>
					</Box>
				</div>
			</Box>
		</React.Fragment>
	);
};

export default Welcome;
