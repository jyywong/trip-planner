import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Box, Typography, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import SavedDetailBody from './SavedDetailBody';
import SavedLocationBody from './SavedLocationBody';
import NextStopBody from './NextStop/NextStopBody';
import { displayOnlyIfTimelineStateIsNotTimelineOnly } from '../../HelperFunction';
const useStyles = makeStyles({
	noDisplay: {
		display: 'none'
	},
	display: {
		display: 'inherit'
	}
});
const SavedDetailBase = ({ timelineState }) => {
	const classes = useStyles();
	const [ tabValue, setTabValue ] = useState(0);
	const selectedItem = useSelector((state) => state.tripStop.selectedStop);
	const stop = useSelector((state) => state.tripStop.stops.find((stop) => stop.id === selectedItem));
	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	useEffect(
		() => {
			console.log('saveddetailbase being updated');
			setTabValue(0);
		},
		[ selectedItem ]
	);
	return (
		<React.Fragment>
			<Box
				display={displayOnlyIfTimelineStateIsNotTimelineOnly(timelineState)}
				width="100%"
				justifyContent="center"
				component={motion.div}
				layout
			>
				<Tabs value={tabValue} onChange={handleTabChange}>
					<Tab label="Details" />
					<Tab label="Location" />
					<Tab label="Next Stop" />
				</Tabs>
			</Box>
			<Box
				display={displayOnlyIfTimelineStateIsNotTimelineOnly(timelineState)}
				boxSizing="border-box"
				flexDirection="column"
				width="100%"
				height="50%"
				flexGrow="1"
				component={motion.div}
				layout
			>
				{(() => {
					switch (tabValue) {
						case 0:
							return (
								<SavedDetailBody
									selectedItem={selectedItem}
									timelineState={timelineState}
									classes={classes}
									stop={stop}
								/>
							);
						case 1:
							return <SavedLocationBody />;
						case 2:
							return <NextStopBody />;
					}
				})()}
			</Box>
		</React.Fragment>
	);
};

export default SavedDetailBase;
