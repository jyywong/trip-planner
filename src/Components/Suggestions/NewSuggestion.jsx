import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import NewLocationSelector from './NewSuggestionParts/NewLocationSelector';
import { newSuggestion } from '../../Slices/SuggestionsSlice';

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
	const dispatch = useDispatch();
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
	const selectedItem = useSelector((state) => state.tripStop.selectedStop);
	const selectedStop = useSelector((state) => state.tripStop.stops.find((stop) => stop.id === selectedItem));
	useEffect(
		() => {
			if (selectedItem !== 0) {
				const { time, details, location } = selectedStop;
				setFormValues({
					eventName: details.title,
					details: details.body,
					time: format(parseISO(time), 'kk:mm'),
					location
				});
			}
		},
		[ selectedItem ]
	);
	const classes = useStyles();
	const handleCreate = () => {
		const newSuggestionObject = {
			id: Math.random() * 100,
			creator: 1,
			created_at: new Date().toISOString(),
			content: formValues,
			votes: {
				upvotes: 0,
				downvotes: 0
			}
		};
		dispatch(newSuggestion(newSuggestionObject));
	};
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
						<NewLocationSelector />
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
