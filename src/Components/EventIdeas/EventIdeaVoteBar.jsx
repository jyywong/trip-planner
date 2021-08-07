import React from 'react';
import { Box } from '@material-ui/core';

const EventIdeaVoteBar = ({ votes }) => {
	const voteTotal = votes.upvotes + votes.downvotes;

	return (
		<React.Fragment>
			<Box display="flex" flexBasis="2%" bgcolor="#c4c4c4" borderRadius="0 0 10px 10px" overflow="hidden">
				<Box flexBasis={`${votes.upvotes / voteTotal * 100}%`} bgcolor="green" />
				<Box flexBasis={`${votes.downvotes / voteTotal * 100}%`} bgcolor="#B50101" />
			</Box>
		</React.Fragment>
	);
};

export default EventIdeaVoteBar;
