import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { useGetAlternativesQuery } from '../../Services/tripPlannerBackend';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Box, Typography, Button } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AddIcon from '@material-ui/icons/Add';
import { MLaptopMQ, SMobileMQ } from '../../HelperFunction';
import Suggestion from './Suggestion';
import NewSuggestion from './NewSuggestion';
import { openDetails, timelineModeSelector } from '../../Slices/TimelineStateSlice';
import { useMediaQuery } from '@material-ui/core';
import { TabletMQ } from '../../HelperFunction';
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
	fullSuggestions: {
		gridColumn: '1/9',
		gridRow: '1/2',
		display: 'flex',
		minHeight: '0'
	},
	halfSuggestions: {
		gridColumn: '5/9',
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
	const dispatch = useDispatch();
	const tablet = useMediaQuery(TabletMQ);
	const sMobile = useMediaQuery(SMobileMQ);
	const mLaptop = useMediaQuery(MLaptopMQ);
	const selectedStop = useSelector((state) => state.tripStop.selectedStop);
	const { data, error, suggestionIsLoading } = useGetAlternativesQuery(selectedStop);
	const timelineState = useSelector(timelineModeSelector);
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
						className={(() => {
							if (tablet) {
								return classes.fullSuggestions;
							} else if (mLaptop) {
								return classes.halfSuggestions;
							} else {
								return classes.openSuggestions;
							}
						})()}
						animate={{
							x: 0
						}}
						initial={{
							x: 500
						}}
						exit={{
							x: 750
						}}
						transition={{
							type: 'spring',
							stiffness: 50,
							mass: 0.8
						}}
					>
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
							<Box
								boxSizing="border-box"
								display="flex"
								paddingX={3}
								paddingBottom={1}
								alignItems={sMobile || mLaptop ? 'center' : 'flex-end'}
								justifyContent="space-between"
								flexDirection={sMobile || mLaptop ? 'column' : 'row'}
								flexBasis="10%"
								width="100%"
								bgcolor="#c4c4c4"
							>
								<Typography className={classes.whiteText} variant="h4">
									Suggestions
								</Typography>
								<Box width={sMobile || mLaptop ? '100%' : 'auto'}>
									<Button
										variant="outlined"
										fullWidth={sMobile || mLaptop ? true : false}
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
									{!suggestionIsLoading &&
										!error &&
										data.map((alternative) => (
											<Suggestion key={alternative.id} suggestion={alternative} />
										))}
								</Box>
								<Box>
									<Button
										startIcon={<ChevronLeftIcon fontSize="large" />}
										onClick={() => {
											dispatch(openDetails());
										}}
									>
										Details
									</Button>
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
