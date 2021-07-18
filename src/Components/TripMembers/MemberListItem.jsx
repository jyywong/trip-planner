import React from 'react';
import { motion } from 'framer-motion';
import { Box, Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
	avatarOverride: {
		height: '4rem',
		width: '4rem'
	}
}));
const MemberListItem = () => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Box
				boxSizing="border-box"
				display="flex"
				marginLeft={5}
				marginRight={3}
				marginY={2}
				alignItems="center"
				component={motion.div}
				layout
			>
				<Avatar className={classes.avatarOverride}>OP</Avatar>
				<Box marginLeft={10}>
					<Typography variant="h5">John Doe</Typography>
				</Box>
				<Box marginLeft={20}>
					<Typography variant="h6">email@email.com</Typography>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default MemberListItem;
