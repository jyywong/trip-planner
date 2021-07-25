import React from 'react';
import { Button, TableCell, TableRow } from '@material-ui/core';
import { useUpdateInviteMutation } from '../../Services/tripPlannerBackend';
const InviteItem = ({ invite }) => {
	const [ updateInvite, { data, error, isLoading } ] = useUpdateInviteMutation();
	const handleAccept = () => {
		updateInvite({ inviteID: invite.id, action: 'Accepted' }).then((response) => console.log(response));
	};
	const handleDecline = () => {};
	return (
		<React.Fragment>
			<TableRow>
				<TableCell align="center">{invite.trip.name}</TableCell>
				<TableCell align="center">{invite.admin + ' ' + invite.adminEmail}</TableCell>
				{invite.status === 'Pending' ? (
					<React.Fragment>
						<TableCell align="right">
							<Button variant="contained" color="primary" onClick={handleAccept}>
								Accept
							</Button>
						</TableCell>
						<TableCell align="center">
							<Button variant="contained" color="secondary">
								Decline
							</Button>
						</TableCell>
					</React.Fragment>
				) : (
					<TableCell colSpan="2" align="center">
						<Button variant="contained" color="primary" disabled>
							Accepted
						</Button>
					</TableCell>
				)}
			</TableRow>
		</React.Fragment>
	);
};

export default InviteItem;
