import React, { useState, useCallback, useRef } from 'react';
import { getDetails } from 'use-places-autocomplete';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import LocationDetails from './LocationDetails';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
	width: '100%',
	height: '100%'
};

const center = {
	lat: -3.745,
	lng: -38.523
};

const libraries = [ 'places' ];

const SavedLocationBody = () => {
	const selectedItem = useSelector((state) => state.tripStop.selectedStop);
	const stop = useSelector((state) => state.tripStop.stops.find((stop) => stop.id === selectedItem));
	const [ placeDetails, setPlaceDetails ] = useState({
		name: '',
		business_status: '',
		formatted_address: '',
		icon: '',
		types: [],
		url: ''
	});
	const [ currentMapMarker, setCurrentMapMarker ] = useState(null);
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries
	});

	const [ map, setMap ] = useState(null);
	const onLoad = useCallback(
		(map) => {
			console.log('maps loaded');
			// const bounds = new window.google.maps.LatLngBounds();
			// map.fitBounds(bounds);
			setMap(map);
			mapRef.current = map;
			panTo({ lat: Number(stop.location.latLng[0]), lng: Number(stop.location.latLng[1]) });
			setCurrentMapMarker({ lat: Number(stop.location.latLng[0]), lng: Number(stop.location.latLng[1]) });
			map.setCenter({ lat: Number(stop.location.latLng[0]), lng: Number(stop.location.latLng[1]) });

			const parameter = {
				placeId: stop.location.place_id,
				fields: [ 'name', 'business_status', 'formatted_address', 'icon', 'type', 'url' ]
			};

			getDetails(parameter).then((details) => {
				const { name, business_status, formatted_address, icon, types, url } = details;
				setPlaceDetails({ name, business_status, formatted_address, icon, types, url });
				console.log(details);
			});
		},
		[ stop ]
	);

	const onUnmount = useCallback((map) => {
		setMap(null);
	}, []);

	const mapRef = useRef();

	const panTo = useCallback(({ lat, lng }) => {
		console.log('panTo being called');
		console.log(lat, lng);
		mapRef.current.panTo({ lat, lng });
		mapRef.current.setZoom(16);
	}, []);

	return (
		<React.Fragment>
			<Box boxSizing="border-box" padding={4} display="flex" flexDirection="column" width="100%" height="35%">
				<LocationDetails placeDetails={placeDetails} />
			</Box>
			<Box
				boxSizing="border-box"
				display="flex"
				width="100%"
				flexGrow="1"
				bgcolor="pink"
				borderRadius="0 0 10px 10px"
				overflow="hidden"
			>
				{isLoaded ? (
					<GoogleMap
						mapContainerStyle={containerStyle}
						center={center}
						zoom={10}
						onLoad={onLoad}
						onUnmount={onUnmount}
						options={{
							disableDefaultUI: 'true',
							zoomControl: 'true'
						}}
					>
						<Marker position={currentMapMarker} />
					</GoogleMap>
				) : (
					<React.Fragment />
				)}
			</Box>
		</React.Fragment>
	);
};

export default SavedLocationBody;
