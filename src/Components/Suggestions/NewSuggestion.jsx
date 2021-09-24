import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { Box, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import NewLocationSelector from './NewSuggestionParts/NewLocationSelector';
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
	const formik = useFormik({
		initialValues: {
			eventName: '',
			time: '',
			details: ''
		},
		validationSchema: Yup.object({
			eventName: Yup.string().max(30, 'Name must be less than 30 characters!').required('Must have a name!'),
			time: Yup.string().required('Must have a time!'),
			details: Yup.string().required('Must have details!')
		}),
		onSubmit: () => {
			const { eventName, time, details } = formik.values;
			const { locationName, address, place_id } = formValues;
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
		}
	});

	const { enqueueSnackbar } = useSnackbar();
	const [ createSuggestion, { isSuccess, isError, error } ] = useCreateAlternativeMutation();
	const [ formValues, setFormValues ] = useState({ place_id: '', address: '', locationName: '', lat: '', lng: '' });
	const today = useSelector((state) => state.tripStop.date);
	const selectedItem = useSelector((state) => state.tripStop.selectedStop);
	const classes = useStyles();

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
				<form onSubmit={formik.handleSubmit} noValidate>
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="space-between"
						paddingBottom={2}
						paddingX={4}
					>
						<TextField
							className={classes.overrideTextMargins}
							id="eventName"
							name="eventName"
							variant="outlined"
							label="New event name"
							{...formik.getFieldProps('eventName')}
							error={formik.touched.eventName && formik.errors.eventName && true}
							helperText={
								formik.touched.eventName && formik.errors.eventName ? formik.errors.eventName : ''
							}
						/>
						<TextField
							className={classes.overrideTextMargins}
							id="time"
							name="time"
							label="New time"
							InputLabelProps={{ shrink: true }}
							type="time"
							variant="outlined"
							{...formik.getFieldProps('time')}
							error={formik.touched.time && formik.errors.time && true}
							helperText={formik.touched.time && formik.errors.time ? formik.errors.time : ''}
						/>
						<div className={classes.overrideTextMargins}>
							<NewLocationSelector setFormValues={setFormValues} />
						</div>

						<TextField
							className={classes.overrideTextMargins}
							id="details"
							name="details"
							label="New details"
							variant="outlined"
							rows={5}
							multiline
							{...formik.getFieldProps('details')}
							error={formik.touched.details && formik.errors.details && true}
							helperText={formik.touched.details && formik.errors.details ? formik.errors.details : ''}
						/>
						<Button
							className={classes.overrideCreateButtonMargin}
							size="large"
							color="primary"
							variant="contained"
							type="submit"
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
				</form>
			</Box>
		</React.Fragment>
	);
};

export default NewSuggestion;
