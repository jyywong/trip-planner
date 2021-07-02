import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Typography } from '@material-ui/core';
import TimelineComp from './TimelineComp';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	expandGrid: {
		gridColumn: '1/9',
		gridrow: '1/2'
	},
	collapsedGrid: {
		gridColumn: '1/4',
		gridRow: '1/2'
	}
});
const TimelineContainer = () => {
	const [ selectedItem, setSelectedItem ] = useState({});
	const collapseTimeline = useSelector((state) => state.timelineExpand);
	const classes = useStyles();
	return (
		<React.Fragment>
			<div className={collapseTimeline ? classes.collapsedGrid : classes.expandGrid}>
				<Box
					display="flex"
					flexDirection="column"
					height="100%"
					alignItems="center"
					borderRadius="10px"
					boxShadow={3}
					m={1}
				>
					<Box display="flex" marginTop={2} height="15%" alignSelf="f">
						<Typography variant="h2">Name of Trip</Typography>
					</Box>
					<Box>
						<TimelineComp
							selectedItem={selectedItem}
							setSelectedItem={setSelectedItem}
							collapseTimeline={collapseTimeline}
						/>
					</Box>
				</Box>
			</div>
		</React.Fragment>
	);
};

export default TimelineContainer;
