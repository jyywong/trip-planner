import React from 'react';
import { Box, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import InviteItem from './InviteItem';
import { useGetUserInvitesQuery } from '../../Services/tripPlannerBackend';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	whiteText: {
		color: '#f2f2f2'
	}
});
const InviteList = () => {
	const classes = useStyles();
	const { data, error, isLoading } = useGetUserInvitesQuery();
	return (
		<React.Fragment>
			<Box
				display="flex"
				alignSelf="center"
				marginTop={2}
				flexBasis="85%"
				flexDirection="column"
				width="90%"
				boxSizing="border-box"
				boxShadow={3}
				borderRadius="10px"
				overflow="hidden"
			>
				<Box
					boxSizing="border-box"
					display="flex"
					alignItems="flex-end"
					flexBasis="14%"
					paddingY={1}
					paddingX={3}
					bgcolor="gray"
				>
					<Typography align="center" className={classes.whiteText} variant="h2">
						My Invites
					</Typography>
				</Box>
				<Box display="flex" flexGrow="1">
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell align="center">Trip Name</TableCell>
									<TableCell align="center">Invited by</TableCell>
									<TableCell colSpan="2" />
								</TableRow>
							</TableHead>
							<TableBody>
								{!isLoading && data.map((invite) => <InviteItem key={invite.id} invite={invite} />)}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default InviteList;
