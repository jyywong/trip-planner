import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Box, Typography, TextField, Button } from '@material-ui/core';
import { useCreateInvitationMutation } from '../../Services/tripPlannerBackend';
import { timelineSelectedTrip } from '../../Slices/TimelineStateSlice';
const NewMemberForm = ({ setShowForm }) => {
	const { enqueueSnackbar } = useSnackbar();
	const selectedTrip = useSelector(timelineSelectedTrip);
	const [ createInvite, { isSuccess, isError } ] = useCreateInvitationMutation();

	const handleCancel = () => {
		setShowForm(false);
	};

	const formik = useFormik({
		initialValues: {
			email: ''
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Invalid email address').required('Please enter a valid email address')
		}),
		onSubmit: () => {
			createInvite({ tripID: selectedTrip, email: formik.values.email }).then((response) =>
				console.log(response)
			);
		}
	});

	useEffect(
		() => {
			if (isSuccess) {
				enqueueSnackbar('Successfully sent invitation', { variant: 'success' });
			} else if (isError) {
				enqueueSnackbar('Unable to create new invite', { variant: 'error' });
			}
		},
		[ isSuccess, isError ]
	);
	return (
		<React.Fragment>
			<Box
				alignSelf="center"
				boxSizing="border-box"
				margin={3}
				padding={2}
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
				transition={{
					type: 'spring',
					duration: 0.5
				}}
			>
				<Box alignSelf="center">
					<Typography variant="h5">Add New Member</Typography>
				</Box>
				<form onSubmit={formik.handleSubmit}>
					<Box marginTop={3}>
						<TextField
							variant="outlined"
							id="email"
							name="email"
							label="New member email"
							{...formik.getFieldProps('email')}
							error={formik.touched.email && formik.errors.email && true}
							helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
							fullWidth
						/>
					</Box>
					<Box display="flex" marginTop={3} justifyContent="flex-end">
						<Button color="primary" variant="outlined" onClick={handleCancel}>
							Cancel
						</Button>
						<Box marginLeft={2}>
							<Button color="primary" variant="contained" type="submit">
								Send Invite
							</Button>
						</Box>
					</Box>
				</form>
			</Box>
		</React.Fragment>
	);
};

export default NewMemberForm;
