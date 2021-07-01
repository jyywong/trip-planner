import React from 'react';
import { Box } from '@material-ui/core';

const DetailHeaderBase = ({ collapseTimeline, children }) => {
	return (
		<React.Fragment>
			<Box
				display={collapseTimeline ? 'flex' : 'none'}
				boxSizing="border-box"
				width="100%"
				height="15%"
				alignItems="flex-end"
				paddingY={2}
				paddingX={4}
				bgcolor="#bb86fc"
			>
				{children}
			</Box>
		</React.Fragment>
	);
};

export default DetailHeaderBase;
