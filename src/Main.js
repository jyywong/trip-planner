import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { useJsApiLoader } from '@react-google-maps/api';
import { updateGoogleIsLoaded } from './Slices/TripStopSlice';
import Welcome from './Pages/Welcome';
import NewTrip from './Pages/NewTrip';
import Login from './Pages/Login';
import UserHome from './Pages/UserHome';
import SignUp from './Pages/SignUp';

import EditTrip from './Pages/EditTrip';

const libraries = [ 'places' ];

function Main() {
	const dispatch = useDispatch();
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
				<Route path="/signup">
					<SignUp />
				</Route>
				<ProtectedRoute path="/home" component={UserHome} />
				<ProtectedRoute path="/edit_trip" component={EditTrip} />
			</Switch>
		</Router>
	);
}

export default Main;
