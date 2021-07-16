import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { makeStyles } from '@material-ui/styles';
import { upvoteEventIdea, downvoteEventIdea } from '../../Slices/EventIdeasSlice';

const useStyles = makeStyles({
	greenThumb: {
		color: '#008000'
	},
	redThumb: {
		color: '#B50101'
	}
});

const EventIdeaVoteButtons = ({ id, votes }) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const handleUpvote = () => {
		dispatch(upvoteEventIdea({ id }));
	};
	const handleDownvote = () => {
		dispatch(downvoteEventIdea({ id }));
	};
	return (
		<React.Fragment>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				flexBasis="15%"
				flexDirection="column"
				bgcolor="#f2f2f2"
			>
				<Typography variant="h6">{votes.upvotes}</Typography>

				<IconButton onClick={handleUpvote}>
					<ThumbUpIcon className={classes.greenThumb} />
				</IconButton>

				<IconButton onClick={handleDownvote}>
					<ThumbDownIcon className={classes.redThumb} />
				</IconButton>
				<Typography variant="h6">{votes.downvotes}</Typography>
			</Box>
		</React.Fragment>
	);
};

export default EventIdeaVoteButtons;
