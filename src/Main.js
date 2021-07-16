import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useJsApiLoader } from '@react-google-maps/api';
import { motion, AnimateSharedLayout } from 'framer-motion';
import DetailComp from './Components/DetailComp';
import TimelineContainer from './Components/TimelineContainer';
import { wrapGrid } from 'animate-css-grid';
import SuggestionsComp from './Components/Suggestions/SuggestionsComp';
import { updateGoogleIsLoaded } from './Slices/TripStopSlice';
import EventIdeaContainer from './Components/EventIdeas/EventIdeaContainer';
import Welcome from './Pages/Welcome';
import NewTrip from './Pages/NewTrip';
import Login from './Pages/Login';
import UserHome from './Pages/UserHome';

const libraries = [ 'places' ];

function Main() {
	const dispatch = useDispatch();
	const gridRef = useRef(null);
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries
	});
	useEffect(
		() => {
			dispatch(updateGoogleIsLoaded(isLoaded));
		},
		[ isLoaded ]
	);
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Welcome />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/home">
					<UserHome />
				</Route>
				<Route path="/new_trip">
					<NewTrip />
				</Route>
				<Route path="/edit_trip">
					<div
						ref={gridRef}
						style={{
							display: 'grid',
							padding: '1rem',
							borderRadius: '10px',
							height: '95vh',
							maxHeight: '100vh',
							minHeight: '0',
							width: '97vw',
							gridTemplateColumns: 'repeat(8, 1fr)',
							overflowX: 'hidden'
						}}
					>
						<TimelineContainer />
						<DetailComp />
						<SuggestionsComp />
						<EventIdeaContainer />
					</div>
				</Route>
			</Switch>
		</Router>
	);
}

export default Main;
