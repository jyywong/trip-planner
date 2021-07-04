import React, { useState, useCallback, useRef } from 'react';
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
	const [ currentMapMarker, setCurrentMapMarker ] = useState(null);
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries
	});

	const [ map, setMap ] = useState(null);
	const onLoad = useCallback((map) => {
		const bounds = new window.google.maps.LatLngBounds();
		map.fitBounds(bounds);
		setMap(map);
		mapRef.current = map;
	}, []);
	const onUnmount = useCallback((map) => {
		setMap(null);
	}, []);

	const mapRef = useRef();

	const panTo = useCallback(({ lat, lng }) => {
		mapRef.current.panTo({ lat, lng });
		mapRef.current.setZoom(14);
	}, []);

	return (
		<React.Fragment>
			<Box boxSizing="border-box" padding={4} display="flex" flexDirection="column" width="100%" height="45%">
				<LocationDetails />
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
