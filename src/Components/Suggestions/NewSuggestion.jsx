import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import NewLocationSelector from './NewSuggestionParts/NewLocationSelector';

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

const NewSuggestion = () => {
	const [ formValues, setFormValues ] = useState({
		title: '',
		body: '',
		time: '',
		location: {
			name: '',
			address: '',
			place_id: ''
		}
	});
	const selectedItem = useSelector((state) => state.tripStop.selectedStop);
	const selectedStop = useSelector((state) => state.tripStop.stops.find((stop) => stop.id === selectedItem));
	useEffect(
		() => {
			if (selectedItem !== 0) {
				const { time, details, location } = selectedStop;
				setFormValues({
					title: details.title,
					body: details.body,
					time,
					location
				});
			}
		},
		[ selectedItem ]
	);
	const classes = useStyles();
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
						value={formValues.title}
						onChange={(e) => setFormValues((current) => ({ ...current, title: e.target.value }))}
					/>
					<TextField
						className={classes.overrideTextMargins}
						label="New time"
						InputLabelProps={{ shrink: true }}
						type="time"
						variant="outlined"
					/>
					<TextField
						className={classes.overrideTextMargins}
						label="New location"
						variant="outlined"
						value={formValues.location.name}
						onChange={(e) => setFormValues((current) => ({ ...current, title: e.target.value }))}
					/>
					<NewLocationSelector />
					<TextField
						className={classes.overrideTextMargins}
						label="New details"
						variant="outlined"
						rows={5}
						multiline
						value={formValues.body}
						onChange={(e) => setFormValues((current) => ({ ...current, body: e.target.value }))}
					/>
					<Button
						className={classes.overrideCreateButtonMargin}
						size="large"
						color="primary"
						variant="contained"
					>
						Create
					</Button>
					<Button
						className={classes.overrideCancelButtonMargin}
						size="large"
						color="primary"
						variant="outlined"
					>
						Cancel
					</Button>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default NewSuggestion;
