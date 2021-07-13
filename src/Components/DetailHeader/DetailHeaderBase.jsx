import React from 'react';
import { motion } from 'framer-motion';
import { Box } from '@material-ui/core';
import { displayOnlyIfTimelineStateIsNotTimelineOnly } from '../../HelperFunction';

const DetailHeaderBase = ({ timelineState, children }) => {
	return (
		<React.Fragment>
			<Box
				display={displayOnlyIfTimelineStateIsNotTimelineOnly(timelineState)}
				boxSizing="border-box"
				width="100%"
				height="15%"
				alignItems="flex-end"
				paddingY={2}
				paddingX={4}
				bgcolor="#bb86fc"
				component={motion.div}
				layout
			>
				{children}
			</Box>
		</React.Fragment>
	);
};

export default DetailHeaderBase;
