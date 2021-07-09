import React from 'react';
import { Box } from '@material-ui/core';

const NewSuggestion = () => {
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
				Hello
			</Box>
		</React.Fragment>
	);
};

export default NewSuggestion;
