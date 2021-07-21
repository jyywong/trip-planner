import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import VisualTimeline from './VisualTimeline';
import { selectTrip } from '../../Slices/TimelineStateSlice';
const HomeTimelines = ({ trip }) => {
	const dispatch = useDispatch();
	return (
		<React.Fragment>
			<Link
				to="/edit_trip"
				onClick={() => {
					dispatch(selectTrip(trip.id));
				}}
			>
				<Box
					display="flex"
					padding={2}
					boxSizing="border-box"
					flexDirection="column"
					alignItems="center"
					borderRadius="10px"
					boxShadow={3}
					overflow="hidden"
					m={1}
				>
					<Box display="flex" flexShrink="1" marginTop={2} flexBasis="15%">
						<Typography align="center" variant="h2">
							{trip.name}
						</Typography>
					</Box>
					<VisualTimeline trip={trip} />
				</Box>
			</Link>
		</React.Fragment>
	);
};

export default HomeTimelines;
