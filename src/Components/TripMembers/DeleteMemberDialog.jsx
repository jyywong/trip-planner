import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import { useGetATripQuery, useRemoveMemberMutation } from '../../Services/tripPlannerBackend';
import { timelineSelectedTrip } from '../../Slices/TimelineStateSlice';

const DeleteMemberDialog = ({ chosenMember, showDialog, setShowDialog }) => {
	const selectedTrip = useSelector(timelineSelectedTrip);
	const { data, error, isLoading } = useGetATripQuery(selectedTrip);
	const [ removeMember, { isSuccess, isError } ] = useRemoveMemberMutation();

	const handleConfirm = () => {
		const memberList = data.members;
		const removedMemberFromList = {
			members: memberList.filter((member) => member.id !== chosenMember.id).map((member) => member.id)
		};
		console.log(removedMemberFromList);
		removeMember({ tripID: selectedTrip, newMemberList: removedMemberFromList }).then((response) =>
			console.log(response)
		);
	};
	return (
		<Dialog open={showDialog} onClose={() => setShowDialog(false)}>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{`Are you sure you want to remove ${chosenMember.username} from the trip?`}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					color="secondary"
					onClick={() => {
						setShowDialog(false);
					}}
				>
					Cancel
				</Button>
				<Button color="primary" onClick={handleConfirm} autoFocus>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteMemberDialog;
