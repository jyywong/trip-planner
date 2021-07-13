import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Typography, Divider, Button } from '@material-ui/core';

import EventIdeaDetails from './EventIdeaDetails';
import EventIdeaLocation from './EventIdeaLocation';
import EventIdeaVoteButtons from './EventIdeaVoteButtons';
import EventIdeaVoteBar from './EventIdeaVoteBar';

const useStyles = makeStyles({
	whiteText: {
		color: 'white'
	}
});

const EventIdea = ({ eventIdea }) => {
	const classes = useStyles();
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
						width="100%"
						justifyContent="space-between"
						alignSelf="flex-end"
					>
						<Typography className={classes.whiteText} variant="h4">
							{eventIdea.content.eventName}
						</Typography>
					</Box>
					<Box alignSelf="center" marginRight={1.5}>
						<Button variant="contained" color="primary">
							Add
						</Button>
					</Box>
				</Box>
				<Box display="flex" flexGrow="1">
					<Box marginTop={1} display="flex" justifyContent="space-evenly">
						<EventIdeaDetails details={eventIdea.content.details} />
						<Box display="flex" alignItems="center">
							<Box height="80%">
								<Divider orientation="vertical" flexItem />
							</Box>
						</Box>
						<EventIdeaLocation location={eventIdea.content.location} />
					</Box>
					<EventIdeaVoteButtons votes={eventIdea.votes} />
				</Box>
				<EventIdeaVoteBar votes={eventIdea.votes} />
			</Box>
		</React.Fragment>
	);
};

export default EventIdea;
