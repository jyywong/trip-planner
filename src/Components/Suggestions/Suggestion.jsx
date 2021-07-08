import React from 'react';
import { Box } from '@material-ui/core';
import SuggestionHeader from './SuggestionHeader';
import SuggestionPropChange from './SuggestionPropChange';
import SuggestionVotes from './SuggestionVotes';
import SuggestionVoteBar from './SuggestionVoteBar';
const Suggestion = () => {
	return (
		<React.Fragment>
			<Box
				boxSizing="border-box"
				flexBasis="35%"
				margin={3}
				width="80%"
				borderRadius="10px"
				boxShadow={4}
				display="flex"
				justifyContent="space-between"
				flexDirection="column"
				bgcolor="white"
				// overflow="hidden"
			>
				<Box padding={2}>
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
