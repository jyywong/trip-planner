import React, { useState } from 'react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Box, Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { displayOnlyIfTimelineStateIsTimelineDetailsSuggestions, timelineStateComparer } from '../../HelperFunction';
import Suggestion from './Suggestion';
import NewSuggestion from './NewSuggestion';

const useStyles = makeStyles({
	collapsedGrid: {
		gridColumn: '9/9',
		gridRow: '1/2',
		visibility: 'hidden',
		opacity: '0',
		display: 'flex',
		minHeight: '0'
	},
	openSuggestions: {
		gridColumn: '7/9',
		gridRow: '1/2',
		display: 'flex',
		minHeight: '0'
	},
	whiteText: {
		color: 'white'
	},
	scrollbar: {
		'&::-webkit-scrollbar': {
			width: '14px'
		},
		'&::-webkit-scrollbar-track': {
			background: 'transparent'
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: '#a3a3a3',
			borderRadius: '10px',
			border: '4px solid #f2f2f2'
		}
	}
});
const SuggestionsComp = () => {
	const timelineState = useSelector((state) => state.timelineState);
	const alternativesForSelectedStop = useSelector((state) => {
		const allSuggestions = Object.values(state.suggestions.byID);
		return allSuggestions.filter((suggestion) => suggestion.eventID === state.tripStop.selectedStop);
	});
	const [ showForm, setShowForm ] = useState(false);
	const classes = useStyles();
	return (
		<AnimatePresence>
			{timelineState === 'TIMELINE_DETAILS_SUGGESTIONS' && (
				<React.Fragment>
					<motion.div
						key="suggestion"
						className={classes.openSuggestions}
						animate={{
							x: 0
						}}
						initial={{
							x: 500
						}}
						exit={{
							x: 500
						}}
						transition={{
							type: 'spring',
							stiffness: 50,
							mass: 0.8
						}}
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
								paddingX={3}
								paddingBottom={1}
								alignItems="flex-end"
								justifyContent="space-between"
								flexBasis="10%"
								width="100%"
								bgcolor="#c4c4c4"
							>
								<Typography className={classes.whiteText} variant="h4">
									Suggestions
								</Typography>
								<Box>
									<Button
										variant="outlined"
										onClick={() => {
											setShowForm(true);
										}}
									>
										<AddIcon />
									</Button>
								</Box>
							</Box>
							<AnimateSharedLayout>
								<Box
									className={classes.scrollbar}
									display="flex"
									overflow="auto"
									flexDirection="column"
									alignItems="center"
									width="100%"
									height="100%"
									minHeight="0"
									component={motion.div}
									layout
								>
									<AnimatePresence>
										{showForm && <NewSuggestion key="newSuggestion" setShowForm={setShowForm} />}
									</AnimatePresence>
									{alternativesForSelectedStop.map((alternative) => (
										<Suggestion key={alternative.id} suggestion={alternative} />
									))}
								</Box>
							</AnimateSharedLayout>
						</Box>
					</motion.div>
				</React.Fragment>
			)}
		</AnimatePresence>
	);
};

export default SuggestionsComp;
