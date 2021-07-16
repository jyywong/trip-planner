import React from 'react';
import { Box, Typography } from '@material-ui/core';

const SuggestionVoteBar = ({ suggestion }) => {
	const voteTotal = suggestion.votes.upvotes + suggestion.votes.downvotes;
	return (
		<React.Fragment>
			<Box display="flex" alignSelf="stretch">
				<Box
					bgcolor="#008000"
					borderRadius=" 0px 0px 0px 10px"
					boxShadow="0px 3px 10px #008000"
					flexBasis={`${suggestion.votes.upvotes / voteTotal * 100}%`}
					minHeight=".4rem"
				/>
				<Box
					bgcolor="#B50101"
					borderRadius=" 0px 0px 10px 0px"
					boxShadow="0px 3px 10px #B50101"
					flexBasis={`${suggestion.votes.downvotes / voteTotal * 100}%`}
					minHeight=".4rem"
				/>
			</Box>
		</React.Fragment>
	);
};

export default SuggestionVoteBar;
