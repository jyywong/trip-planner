import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Box, Typography, TextField, Button } from '@material-ui/core';
import { useCreateInvitationMutation } from '../../Services/tripPlannerBackend';
import { timelineSelectedTrip } from '../../Slices/TimelineStateSlice';
const NewMemberForm = ({ setShowForm }) => {
	const selectedTrip = useSelector(timelineSelectedTrip);
	const [ email, setEmail ] = useState('');
	const [ createInvite, { data, error, isLoading } ] = useCreateInvitationMutation();
	const handleCreate = () => {
		createInvite({ tripID: selectedTrip, email }).then((response) => console.log(response));
	};
	const handleCancel = () => {
		setShowForm(false);
	};
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
				<Typography variant="h5">Add New Member</Typography>
				<Box marginTop={3}>
					<TextField
						variant="outlined"
						label="New member email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						fullWidth
					/>
				</Box>
				<Box display="flex" marginTop={3} alignSelf="flex-end">
					<Button color="primary" variant="outlined" onClick={handleCancel}>
						Cancel
					</Button>
					<Box marginLeft={2}>
						<Button color="primary" variant="contained" onClick={handleCreate}>
							Send Invite
						</Button>
					</Box>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default NewMemberForm;
