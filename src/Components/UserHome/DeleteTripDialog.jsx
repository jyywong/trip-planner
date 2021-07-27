import React, { useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import { useDeleteTripMutation } from '../../Services/tripPlannerBackend';
import { useSnackbar } from 'notistack';
const DeleteTripDialog = ({ trip, showDialog, setShowDialog }) => {
	const { enqueueSnackbar } = useSnackbar();
	const [ deleteTrip, { isSuccess, isError } ] = useDeleteTripMutation();
	const handleConfirm = () => {
		deleteTrip(trip.id);
		setShowDialog(false);
	};

	useEffect(
		() => {
			if (isSuccess) {
				enqueueSnackbar('Successfully deleted trip', { variant: 'success' });
			} else if (isError) {
				enqueueSnackbar('Unable to delete trip', { variant: 'error' });
			}
		},
		[ isSuccess, isError ]
	);
	return (
		<Dialog open={showDialog} onClose={() => setShowDialog(false)}>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{`Are you sure you want to delete the trip: ${trip.name}?`}
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

export default DeleteTripDialog;
