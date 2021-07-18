import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, TextField, Button } from '@material-ui/core';
const NewMemberForm = ({ setShowForm }) => {
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
				exit={{
					y: -600
				}}
			>
				<Typography variant="h5">Add New Member</Typography>
				<Box marginTop={3}>
					<TextField variant="outlined" label="New member email" fullWidth />
				</Box>
				<Box display="flex" marginTop={3} alignSelf="flex-end">
					<Button color="primary" variant="outlined" onClick={handleCancel}>
						Cancel
					</Button>
					<Box marginLeft={2}>
						<Button color="primary" variant="contained">
							Send Invite
						</Button>
					</Box>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default NewMemberForm;
