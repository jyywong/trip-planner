import React from 'react';
import { Box, Typography } from '@material-ui/core';

const SuggestionVoteBar = () => {
	return (
		<React.Fragment>
			<Box display="flex" alignSelf="stretch" flexBasis="2%">
				<Box
					bgcolor="#008000"
					borderRadius=" 0px 0px 0px 10px"
					boxShadow="0px 3px 10px #008000"
					flexBasis="60%"
				/>
				<Box
					bgcolor="#B50101"
					borderRadius=" 0px 0px 10px 0px"
					boxShadow="0px 3px 10px #B50101"
					flexBasis="40%"
				/>
			</Box>
		</React.Fragment>
	);
};

export default SuggestionVoteBar;
