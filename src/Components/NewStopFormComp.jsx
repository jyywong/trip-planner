import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHours, setMinutes, parseISO } from 'date-fns';
import { createStop } from '../Slices/TripStopSlice';
import NewDetailHeader from './DetailHeader/NewDetailHeader';
import NewDetailBody from './DetailBody/NewDetailBody';
import { useCreateTripEventMutation } from '../Services/tripPlannerBackend';
import { timelineSelectedTrip } from '../Slices/TimelineStateSlice';
import { convertToDate } from '../HelperFunction';
const NewStopFormComp = ({ timelineState }) => {
	const selectedTrip = useSelector(timelineSelectedTrip);
	const [ createEvent, { data, error, isLoading } ] = useCreateTripEventMutation();
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
		// console.log(newStop);
		createEvent({ tripID: selectedTrip, newEvent: newStop }).then((result) => console.log(result));
		dispatch(createStop(newStop));
	};
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
