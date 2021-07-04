import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHours, setMinutes, parseISO } from 'date-fns';
import { createStop } from '../Slices/TripStopSlice';
import NewDetailHeader from './DetailHeader/NewDetailHeader';
import NewDetailBody from './DetailBody/NewDetailBody';
const NewStopFormComp = ({ collapseTimeline }) => {
	const dispatch = useDispatch();
	const today = useSelector((state) => state.tripStop.date);
	const [ formValues, setFormValues ] = useState({
		name: '',
		time: '',
		details: '',
		location: { address: '', place_id: '', latLng: {} }
	});
	const convertToDate = (time) => {
		const hoursRE = /^\d+/;
		const minsRE = /\d+$/;
		const hours = time.match(hoursRE);
		const mins = time.match(minsRE);
		const finalDate = setMinutes(setHours(parseISO(today), hours), mins).toISOString();
		return finalDate;
	};

	const createNewStop = () => {
		const id = Math.random() * 100;
		const newStop = {
			id,
			time: convertToDate(formValues.time),
			details: {
				title: formValues.name,
				body: formValues.details
			},
			location: formValues.location
		};
		dispatch(createStop(newStop));
	};
	return (
		<React.Fragment>
			<NewDetailHeader
				formValues={formValues}
				setFormValues={setFormValues}
				collapseTimeline={collapseTimeline}
			/>
			<NewDetailBody
				createNewStop={createNewStop}
				formValues={formValues}
				setFormValues={setFormValues}
				collapseTimeline={collapseTimeline}
			/>
		</React.Fragment>
	);
};

export default NewStopFormComp;
