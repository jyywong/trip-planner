import React from 'react';
import { Box } from '@material-ui/core';
import SuggestionHeader from './SuggestionParts/SuggestionHeader';
import SuggestionPropChange from './SuggestionParts/SuggestionPropChange';
import SuggestionVotes from './SuggestionParts/SuggestionVotes';
import SuggestionVoteBar from './SuggestionParts/SuggestionVoteBar';
const Suggestion = () => {
	return (
		<React.Fragment>
			<Box
				boxSizing="border-box"
				// flexBasis="40%"
				margin={3}
				width="80%"
				borderRadius="10px"
				boxShadow={4}
				display="flex"
				justifyContent="space-between"
				flexDirection="column"
				bgcolor="white"
			>
				<Box flexGrow="0" padding={2}>
					<SuggestionHeader />
					<SuggestionPropChange />
					<SuggestionVotes />
				</Box>
				<SuggestionVoteBar />
			</Box>
		</React.Fragment>
	);
};

export default Suggestion;
