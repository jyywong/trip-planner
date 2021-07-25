import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import NewLocationSelector from './NewSuggestionParts/NewLocationSelector';
import { newSuggestion } from '../../Slices/SuggestionsSlice';
import { useCreateAlternativeMutation } from '../../Services/tripPlannerBackend';
import { convertToDate } from '../../HelperFunction';

const useStyles = makeStyles((theme) => ({
	overrideTextMargins: {
		marginTop: '.7rem',
		marginBottom: '.7rem'
	},
	overrideCreateButtonMargin: {
		marginTop: '.7rem',
		marginBottom: '.3rem'
	},
	overrideCancelButtonMargin: {
		marginTop: '.3rem',
		marginBottom: '.3rem'
	}
}));

const NewSuggestion = ({ setShowForm }) => {
	const { enqueueSnackbar } = useSnackbar();
	const userID = useSelector((state) => state.authState.user);
	const dispatch = useDispatch();
	const [ createSuggestion, { isSuccess, isError, error } ] = useCreateAlternativeMutation();
	const [ formValues, setFormValues ] = useState({
		eventName: '',
		time: '',
		location: {
			name: '',
			address: '',
			place_id: ''
		},
		details: ''
	});
	const today = useSelector((state) => state.tripStop.date);
	const selectedItem = useSelector((state) => state.tripStop.selectedStop);

	const classes = useStyles();
	const handleCreate = () => {
		const { eventName, time, locationName, address, place_id, details } = formValues;
		const newSuggestionObject = {
			alternativeTo: selectedItem,
			createdBy: 1,
			createdAt: new Date().toISOString(),
			time: convertToDate(today, time),
			name: eventName,
			details,
			locationName,
			address,
			placeID: place_id,
			upvotes: 0,
			downvotes: 0
		};
		console.log(newSuggestionObject);
		createSuggestion({ eventID: selectedItem, newAlternative: newSuggestionObject });
	};

	useEffect(
		() => {
			if (isSuccess) {
				enqueueSnackbar('Successfully created new suggestion', { variant: 'success' });
				setShowForm(false);
			} else if (isError) {
				enqueueSnackbar('Unable to create new suggestion', { variant: 'error' });
			}
		},
		[ isSuccess, isError ]
	);
	return (
		<React.Fragment>
			<Box
				boxSizing="border-box"
				flexBasis="40%"
				margin={3}
				width="80%"
				borderRadius="10px"
				boxShadow={4}
				display="flex"
				justifyContent="space-between"
				flexDirection="column"
				bgcolor="white"
				component={motion.div}
				animate={{
					y: 0
				}}
				initial={{
					y: -200
				}}
				exit={{
					y: -600
				}}
			>
				<Box display="flex" marginTop={2} justifyContent="center" alignItems="center" width="100%">
					<Typography variant="h5">New suggestion</Typography>
				</Box>
				<Box
					display="flex"
					flexDirection="column"
					justifyContent="space-between"
					paddingBottom={2}
					paddingX={4}
				>
					<TextField
						className={classes.overrideTextMargins}
						variant="outlined"
						label="New event name"
						value={formValues.eventName}
						onChange={(e) => setFormValues((current) => ({ ...current, eventName: e.target.value }))}
					/>
					<TextField
						className={classes.overrideTextMargins}
						label="New time"
						InputLabelProps={{ shrink: true }}
						type="time"
						variant="outlined"
						value={formValues.time}
						onChange={(e) => setFormValues((current) => ({ ...current, time: e.target.value }))}
					/>
					<div className={classes.overrideTextMargins}>
						<NewLocationSelector setFormValues={setFormValues} />
					</div>

					<TextField
						className={classes.overrideTextMargins}
						label="New details"
						variant="outlined"
						rows={5}
						multiline
						value={formValues.details}
						onChange={(e) => setFormValues((current) => ({ ...current, details: e.target.value }))}
					/>
					<Button
						className={classes.overrideCreateButtonMargin}
						size="large"
						color="primary"
						variant="contained"
						onClick={handleCreate}
					>
						Create
					</Button>
					<Button
						className={classes.overrideCancelButtonMargin}
						size="large"
						color="primary"
						variant="outlined"
						onClick={() => {
							setShowForm(false);
						}}
					>
						Cancel
					</Button>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default NewSuggestion;
