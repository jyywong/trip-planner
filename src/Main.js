import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useJsApiLoader } from '@react-google-maps/api';
import DetailComp from './Components/DetailComp';
import TimelineContainer from './Components/TimelineContainer';
import { wrapGrid } from 'animate-css-grid';
import SuggestionsComp from './Components/Suggestions/SuggestionsComp';
import { updateGoogleIsLoaded } from './Slices/TripStopSlice';
import EventIdeaContainer from './Components/EventIdeas/EventIdeaContainer';

const libraries = [ 'places' ];

function Main() {
	const dispatch = useDispatch();
	const gridRef = useRef(null);
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries
	});
	useEffect(() => {
		wrapGrid(gridRef.current, { duration: 400, easing: 'easeOut' });
	}, []);
	useEffect(
		() => {
			dispatch(updateGoogleIsLoaded(isLoaded));
		},
		[ isLoaded ]
	);
	return (
		<React.Fragment>
			{/* <Welcome /> */}
			{/* <NewTrip /> */}
			<div
				ref={gridRef}
				style={{
					display: 'grid',
					padding: '1rem',
					borderRadius: '10px',
					height: '92vh',
					maxHeight: '92vh',
					minHeight: '0',
					width: '97vw',
					gridTemplateColumns: 'repeat(8, 1fr)'
				}}
			>
				<TimelineContainer />
				<DetailComp />
				<SuggestionsComp />
				<EventIdeaContainer />
			</div>
		</React.Fragment>
	);
}

export default Main;
