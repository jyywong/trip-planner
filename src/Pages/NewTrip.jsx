import React from 'react';
import { Card, Button, Typography, CardContent, Box, TextField } from '@material-ui/core';
const NewTrip = () => {
	return (
		<Box display="flex" width="100vw" height="100vh" alignItems="center" justifyContent="center">
			<Card width="50%" height="50%" raised>
				<CardContent>
					<Box display="flex" padding={8} flexDirection="column" alignItems="center" justifyContent="center">
						<Typography variant="h2">New Trip</Typography>
						<Box marginTop={4}>
							<TextField m id="standard-basic" label="New trip name" />
						</Box>
						<Box marginTop={4}>
							<Button variant="contained" color="primary">
								Create
							</Button>
						</Box>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
};

export default NewTrip;
