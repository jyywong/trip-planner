import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { Box, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useCreateTripMutation } from '../../Services/tripPlannerBackend';

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

const NewTripForm = ({ setShowForm }) => {
	const { enqueueSnackbar } = useSnackbar();
	const [ createTrip, { isSuccess, isError } ] = useCreateTripMutation();
	const [ formValues, setFormValues ] = useState({ name: '', date: '' });
	const classes = useStyles();

	const handleCancel = () => {
		setShowForm(false);
	};

	const handleSubmit = () => {
		createTrip(formValues).then((response) => console.log(response));
	};

	useEffect(
		() => {
			if (isSuccess) {
				enqueueSnackbar('Successfuly created new trip', { variant: 'success' });
			} else if (isError) {
				enqueueSnackbar('Unable to create new trip', { variant: 'error' });
			}
		},
		[ isSuccess, isError ]
	);

	return (
		<React.Fragment>
			<Box
				alignSelf="center"
				boxSizing="border-box"
				flexBasis="40%"
				margin={3}
				width="35%"
				borderRadius="10px"
				boxShadow={4}
				display="flex"
				justifyContent="space-between"
				alignItems="center"
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
					<Typography variant="h5">New Trip</Typography>
				</Box>
				<Box
					display="flex"
					flexDirection="column"
					justifyContent="center"
					boxSizing="border-box"
					padding={2}
					width="100%"
				>
					<TextField
						className={classes.overrideTextMargins}
						variant="outlined"
						label="Trip Name"
						value={formValues.name}
						onChange={(e) => {
							setFormValues((current) => ({ ...current, name: e.target.value }));
						}}
						fullWidth
					/>
					<TextField
						className={classes.overrideTextMargins}
						label="Date"
						type="date"
						InputLabelProps={{
							shrink: true
						}}
						value={formValues.date}
						onChange={(e) => {
							setFormValues((current) => ({ ...current, date: e.target.value }));
						}}
					/>
					<Button
						className={classes.overrideCreateButtonMargin}
						size="large"
						color="primary"
						variant="contained"
						onClick={handleSubmit}
					>
						Create
					</Button>
					<Button
						className={classes.overrideCancelButtonMargin}
						size="large"
						color="primary"
						variant="outlined"
						onClick={handleCancel}
					>
						Cancel
					</Button>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default NewTripForm;
