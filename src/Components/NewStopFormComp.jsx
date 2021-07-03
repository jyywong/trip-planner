import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createStop } from '../Slices/TripStopSlice';
import NewDetailHeader from './DetailHeader/NewDetailHeader';
import NewDetailBody from './DetailBody/NewDetailBody';
const NewStopFormComp = ({ collapseTimeline }) => {
	const dispatch = useDispatch();
	const [ formValues, setFormValues ] = useState({
		name: '',
		time: '',
		details: '',
		location: { address: '', place_id: '', latLng: {} }
	});
	const createNewStop = () => {
		const id = Math.random() * 100;
		const newStop = {
			id,
			time: formValues.time,
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
