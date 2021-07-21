import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Box, Typography, Divider, Button } from '@material-ui/core';
import { format, parseISO } from 'date-fns';

import EventIdeaDetails from './EventIdeaDetails';
import EventIdeaLocation from './EventIdeaLocation';
import EventIdeaVoteButtons from './EventIdeaVoteButtons';
import EventIdeaVoteBar from './EventIdeaVoteBar';
import { createStop } from '../../Slices/TripStopSlice';

const useStyles = makeStyles({
	whiteText: {
		color: 'white'
	}
});

const EventIdea = ({ eventIdea }) => {
	console.log(eventIdea);
	const { id, suggestor, time, name, details, locationName, address, placeID, upvotes, downvotes } = eventIdea;
	const dispatch = useDispatch();
	const classes = useStyles();
	const handleAdd = () => {
		const id = Math.random() * 100;
		const newStop = {
			id,
			time,
			details: {
				title: name,
				body: details
			},
			location: { locationName, address, placeID }
		};
		dispatch(createStop(newStop));
	};

	return (
		<React.Fragment>
			<Box
				boxSizing="border-box"
				flexBasis="30%"
				margin={3}
				width="80%"
				borderRadius="10px"
				boxShadow={4}
				display="flex"
				justifyContent="space-between"
				flexDirection="column"
				bgcolor="white"
			>
				<Box display="flex" bgcolor="#A895B7" flexBasis="24%" borderRadius="10px 10px 0 0">
					<Box
						display="flex"
						paddingLeft={2}
						marginRight="auto"
						justifyContent="space-between"
						alignSelf="flex-end"
					>
						<Typography className={classes.whiteText} variant="h4">
							{name}
						</Typography>
					</Box>
					<Box alignSelf="flex-end" marginRight={3}>
						<Typography className={classes.whiteText} variant="h5">
							{format(parseISO(time), 'h:mmaaa')}
						</Typography>
					</Box>
					<Box alignSelf="center" marginRight={1.5}>
						<Button variant="contained" color="primary" onClick={handleAdd}>
							Add
						</Button>
					</Box>
				</Box>
				<Box display="flex" flexGrow="1">
					<Box marginTop={1} display="flex" justifyContent="space-evenly">
						<EventIdeaDetails details={details} />
						<Box display="flex" alignItems="center">
							<Box height="80%">
								<Divider orientation="vertical" flexItem />
							</Box>
						</Box>
						<EventIdeaLocation location={{ locationName, address }} />
					</Box>
					<EventIdeaVoteButtons id={id} votes={{ upvotes, downvotes }} />
				</Box>
				<EventIdeaVoteBar votes={{ upvotes, downvotes }} />
			</Box>
		</React.Fragment>
	);
};

export default EventIdea;
