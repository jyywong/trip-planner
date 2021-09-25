import React, { useEffect } from 'react';
import { Button, Avatar, Typography, TableCell, TableRow } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { TabletMidMQ } from '../../HelperFunction';
import { useGetUserDetailsQuery } from '../../Services/tripPlannerBackend';
const useStyles = makeStyles((theme) => ({
	avatarOverride: {
		height: '4rem',
		width: '4rem',
		marginLeft: '1.5rem'
	}
}));
const MemberListItem = ({ user, setShowDialog, setChosenMember }) => {
	const tabletMid = useMediaQuery(TabletMidMQ);
	const { data, error, isLoading } = useGetUserDetailsQuery(user.id);

	const classes = useStyles();
	const handleRemove = () => {
		setShowDialog(true);
		setChosenMember(user);
	};

	return (
		<React.Fragment>
			<TableRow>
				{!tabletMid && (
					<TableCell>
						<Avatar className={classes.avatarOverride} />
					</TableCell>
				)}

				<TableCell>{!isLoading && <Typography variant="h5">{data.username}</Typography>}</TableCell>
				<TableCell>
					<Typography variant="body1">{!isLoading && data.email}</Typography>
				</TableCell>
				<TableCell align="right">
					<Button variant="outlined" color="secondary" onClick={handleRemove}>
						<ClearIcon />
					</Button>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
};

export default MemberListItem;
