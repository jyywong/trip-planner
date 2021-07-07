import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Typography } from '@material-ui/core';
import TimelineComp from './TimelineComp';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	expandGrid: {
		gridColumn: '1/9',
		gridrow: '1/2',
		display: 'flex',
		minHeight: '0'
	},
	collapsedGrid: {
		gridColumn: '1/4',
		gridRow: '1/2',
		display: 'flex',
		minHeight: '0'
	},
	root: {
		'&::-webkit-scrollbar': {
			width: '16px'
		},
		'&::-webkit-scrollbar-track': {
			background: 'transparent'
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: '#a3a3a3',
			borderRadius: '10px',
			border: '5px solid #f2f2f2'
		}
	}
}));
const TimelineContainer = () => {
	const [ selectedItem, setSelectedItem ] = useState({});
	const collapseTimeline = useSelector((state) => state.timelineExpand);
	const classes = useStyles();
	return (
		<React.Fragment>
			<div className={collapseTimeline ? classes.collapsedGrid : classes.expandGrid}>
				<Box
					display="flex"
					flexGrow="1"
					boxSizing="border-box"
					flexDirection="column"
					alignItems="center"
					borderRadius="10px"
					boxShadow={3}
					overflow="hidden"
					m={1}
					minHeight="0"
				>
					<Box display="flex" flexShrink="1" marginTop={2} flexBasis="15%" alignSelf="f">
						<Typography variant="h2">Name of Trip</Typography>
					</Box>
					<Box className={classes.root} flexBasis="70%" flexGrow="0" overflow="auto" minHeight="0">
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
