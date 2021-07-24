import React from 'react';
import { motion } from 'framer-motion';
import { Box, Avatar, Typography, TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
	avatarOverride: {
		height: '4rem',
		width: '4rem',
		marginLeft: '1.5rem'
	}
}));
const MemberListItem = ({ user }) => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<TableRow>
				<TableCell>
					<Avatar className={classes.avatarOverride} />
				</TableCell>
				<TableCell>
					<Typography variant="h5">{user.username}</Typography>
				</TableCell>
				<TableCell>
					<Typography variant="body1">{user.email}</Typography>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
};

export default MemberListItem;
