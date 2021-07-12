import React, { useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box, Link, Chip, Button } from '@material-ui/core';
import { GoogleMap, useJsApiLoader, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
	width: '100%',
	height: '100%'
};

const center = {
	lat: -3.745,
	lng: -38.523
};
const libraries = [ 'places' ];

const NextStopBody = () => {
	const isLoaded = useSelector((state) => state.tripStop.googleLibraryIsLoaded);
	const [ dirResponse, setDirResponse ] = useState(null);
	const selectedItem = useSelector((state) => state.tripStop.selectedStop);
	const currentStop = useSelector((state) => state.tripStop.stops.find((stop) => stop.id === selectedItem));
	const nextStop = useSelector((state) =>
		state.tripStop.stops.find(
			(stop) => state.tripStop.stops.indexOf(stop) === state.tripStop.stops.indexOf(currentStop) + 1
		)
	);

	const dirOptions = useRef();
	const handleDirServiceResponse = (response) => {
		if (response !== null) {
			if (response.status === 'OK') {
				setDirResponse(response);
			} else {
				console.log('response', response);
			}
		}
	};
	dirOptions.current = {
		destination: { placeId: nextStop.location.place_id },
		origin: { placeId: currentStop.location.place_id },
		travelMode: 'WALKING'
	};

	const [ currentMapMarker, setCurrentMapMarker ] = useState(null);

	const mapRef = useRef();

	const [ map, setMap ] = useState(null);
	const onLoad = useCallback((map) => {
		setMap(map);
		mapRef.current = map;
	});
	const onUnmount = useCallback((map) => {
		setMap(null);
	}, []);

	return (
		<React.Fragment>
			<Box
				boxSizing="border-box"
				padding={4}
				display="flex"
				justifyContent="space-between"
				width="100%"
				height="35%"
			>
				<Typography variant="h4">{currentStop.location.name}</Typography>
				<Typography variant="h4">&rarr;</Typography>
				<Typography variant="h4">{nextStop.location.name}</Typography>
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
						<DirectionsService options={dirOptions.current} callback={handleDirServiceResponse} />
						<DirectionsRenderer options={dirResponse} />
					</GoogleMap>
				) : (
					<React.Fragment />
				)}
			</Box>
		</React.Fragment>
	);
};

export default NextStopBody;
