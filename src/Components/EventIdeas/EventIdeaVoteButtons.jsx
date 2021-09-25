import React from 'react';

import { Box, Typography, IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { makeStyles } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import { TabletMidMQ } from '../../HelperFunction';
import { useDownvoteEventIdeaMutation, useUpvoteEventIdeaMutation } from '../../Services/tripPlannerBackend';
const useStyles = makeStyles({
	buttonOverride: {
		padding: '6px'
	},
	greenThumb: {
		color: '#008000'
	},
	greenDisabled: {
		color: '#008000',
		opacity: 0.25
	},
	redThumb: {
		color: '#B50101'
	},
	redDisabled: {
		color: '#B50101',
		opacity: 0.25
	}
});

const EventIdeaVoteButtons = ({ eventIdea, id, votes }) => {
	const [ upvoteEventIdea ] = useUpvoteEventIdeaMutation();
	const [ downvoteEventIdea ] = useDownvoteEventIdeaMutation();
	const tabletMid = useMediaQuery(TabletMidMQ);
	const classes = useStyles();
	const handleUpvote = () => {
		upvoteEventIdea({ eventIdeaID: eventIdea.id, upvote: eventIdea.upvotes + 1 });
	};
	const handleDownvote = () => {
		downvoteEventIdea({ eventIdeaID: eventIdea.id, downvote: eventIdea.downvotes + 1 });
	};
	return (
		<React.Fragment>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				borderRadius={tabletMid ? '0 0 10px 10px' : '0 0 10px 0'}
				flexDirection={tabletMid ? 'row' : 'column'}
				bgcolor="#f2f2f2"
			>
				<Typography variant="h6">{votes.upvotes}</Typography>
				{eventIdea.status === 'Suggested' ? (
					<React.Fragment>
						<IconButton className={classes.buttonOverride} onClick={handleUpvote}>
							<ThumbUpIcon className={classes.greenThumb} />
						</IconButton>

						<IconButton className={classes.buttonOverride} onClick={handleDownvote}>
							<ThumbDownIcon className={classes.redThumb} />
						</IconButton>
					</React.Fragment>
				) : (
					<React.Fragment>
						<IconButton className={classes.buttonOverride} disabled>
							<ThumbUpIcon className={classes.greenDisabled} />
						</IconButton>

						<IconButton className={classes.buttonOverride} disabled>
							<ThumbDownIcon className={classes.redDisabled} />
						</IconButton>
					</React.Fragment>
				)}

				<Typography variant="h6">{votes.downvotes}</Typography>
			</Box>
		</React.Fragment>
	);
};

export default EventIdeaVoteButtons;
