import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import SavedDetailBody from './SavedDetailBody';
import SavedLocationBody from './SavedLocationBody';
const useStyles = makeStyles({
	noDisplay: {
		display: 'none'
	},
	display: {
		display: 'inherit'
	}
});
const SavedDetailBase = ({ collapseTimeline }) => {
	const classes = useStyles();
	const [ tabValue, setTabValue ] = useState(0);
	const selectedItem = useSelector((state) => state.tripStop.selectedStop);
	const stop = useSelector((state) => state.tripStop.stops.find((stop) => stop.id === selectedItem));
	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};
	return (
		<React.Fragment>
			<Box display={collapseTimeline ? 'flex' : 'none'} width="100%" justifyContent="center">
				<Tabs value={tabValue} onChange={handleTabChange}>
					<Tab label="Details" />
					<Tab label="Location" />
					<Tab label="Next Stop" />
				</Tabs>
			</Box>
			<Box
				display={collapseTimeline ? 'flex' : 'none'}
				boxSizing="border-box"
				flexDirection="column"
				width="100%"
				height="50%"
				flexGrow="1"
			>
				{(() => {
					switch (tabValue) {
						case 0:
							return (
								<SavedDetailBody
									selectedItem={selectedItem}
									collapseTimeline={collapseTimeline}
									classes={classes}
									stop={stop}
								/>
							);
						case 1:
							return <SavedLocationBody />;
						case 2:
							return 'Next Stop';
					}
				})()}
			</Box>
		</React.Fragment>
	);
};

export default SavedDetailBase;
