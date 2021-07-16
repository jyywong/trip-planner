import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { makeStyles } from '@material-ui/styles';
import { upvoteSuggestion, downvoteSuggestion } from '../../../Slices/SuggestionsSlice';

const useStyles = makeStyles((theme) => ({
	greenThumb: {
		color: '#008000'
	},
	redThumb: {
		color: '#B50101'
	}
}));

const SuggestionVotes = ({ suggestion }) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const handleUpvote = () => {
		dispatch(upvoteSuggestion({ id: suggestion.id }));
	};
	const handleDownvote = () => {
		dispatch(downvoteSuggestion({ id: suggestion.id }));
	};
	return (
		<React.Fragment>
			<Box
				display="flex"
				flexBasis="20%"
				paddingX={4}
				justifyContent="space-evenly"
				alignItems="center"
				marginTop={2}
			>
				<IconButton onClick={handleUpvote}>
					<ThumbUpIcon className={classes.greenThumb} fontSize="large" />
				</IconButton>
				<Typography variant="h5">{suggestion.votes.upvotes}</Typography>
				<IconButton onClick={handleDownvote}>
					<ThumbDownIcon className={classes.redThumb} fontSize="large" />
				</IconButton>
				<Typography variant="h5">{suggestion.votes.downvotes}</Typography>
			</Box>
		</React.Fragment>
	);
};

export default SuggestionVotes;
