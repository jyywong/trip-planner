import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { setHours, setMinutes, parseISO } from 'date-fns';
import NewDetailHeader from './DetailHeader/NewDetailHeader';
import NewDetailBody from './DetailBody/NewDetailBody';
import { useCreateTripEventMutation } from '../Services/tripPlannerBackend';
import { timelineSelectedTrip } from '../Slices/TimelineStateSlice';
import { convertToDate } from '../HelperFunction';
const NewStopFormComp = ({ timelineState }) => {
	const { enqueueSnackbar } = useSnackbar();
	const selectedTrip = useSelector(timelineSelectedTrip);
	const [ createEvent, { isSuccess, isError } ] = useCreateTripEventMutation();
	const dispatch = useDispatch();
	const today = useSelector((state) => state.tripStop.date);
	const [ formValues, setFormValues ] = useState({
		name: '',
		time: '',
		details: '',
		location: { address: '', place_id: '', latLng: {} }
	});

	const createNewStop = () => {
		const { time, name, details, location: { address, place_id, latLng: { lat, lng } } } = formValues;
		const newStop = {
			trip: selectedTrip,
			time: convertToDate(today, time),
			name,
			details,
			placeID: place_id,
			address,
			lat,
			long: lng
		};

		createEvent({ tripID: selectedTrip, newEvent: newStop });
	};

	useEffect(
		() => {
			if (isSuccess) {
				enqueueSnackbar('Successfully created new event', { variant: 'success' });
			} else if (isError) {
				enqueueSnackbar('Unable to create new event', { variant: 'error' });
			}
		},
		[ isSuccess, isError ]
	);

	return (
		<React.Fragment>
			<NewDetailHeader formValues={formValues} setFormValues={setFormValues} timelineState={timelineState} />
			<NewDetailBody
				createNewStop={createNewStop}
				formValues={formValues}
				setFormValues={setFormValues}
				timelineState={timelineState}
			/>
		</React.Fragment>
	);
};

export default NewStopFormComp;
