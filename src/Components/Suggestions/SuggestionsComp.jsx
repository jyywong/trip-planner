import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Box, Typography } from '@material-ui/core';
import { displayOnlyIfTimelineStateIsTimelineDetailsSuggestions, timelineStateComparer } from '../../HelperFunction';
import Suggestion from './Suggestion';

const useStyles = makeStyles({
	collapsedGrid: {
		gridColumn: '9/9',
		gridRow: '1/2',
		visibility: 'hidden',
		display: 'flex'
	},
	openSuggestions: {
		gridColumn: '7/9',
		gridRow: '1/2',
		visibility: 'visible',
		display: 'flex'
	},
	whiteText: {
		color: 'white'
	}
});
const SuggestionsComp = () => {
	const timelineState = useSelector((state) => state.timelineState);
	const classes = useStyles();
	return (
		<React.Fragment>
			<div
				className={timelineStateComparer(
					timelineState,
					classes.collapsedGrid,
					classes.collapsedGrid,
					classes.openSuggestions
				)}
			>
				<Box
					display={displayOnlyIfTimelineStateIsTimelineDetailsSuggestions(timelineState)}
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
					<Box
						boxSizing="border-box"
						display="flex"
						paddingLeft={3}
						paddingBottom={1}
						alignItems="flex-end"
						flexBasis="10%"
						width="100%"
						bgcolor="#c4c4c4"
					>
						<Typography className={classes.whiteText} variant="h4">
							Suggestions
						</Typography>
					</Box>
					<Suggestion />
				</Box>
			</div>
		</React.Fragment>
	);
};

export default SuggestionsComp;
