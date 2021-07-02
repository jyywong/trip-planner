import React, { useState, useCallback } from 'react';
import { Box } from '@material-ui/core';
import LocationDetails from './LocationDetails';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
const containerStyle = {
	width: '100%',
	height: '100%'
};

const center = {
	lat: -3.745,
	lng: -38.523
};
const SavedLocationBody = () => {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.GOOGLE_MAPS_KEY
	});
	const [ map, setMap ] = useState(null);
	const onLoad = useCallback((map) => {
		const bounds = new window.google.maps.LatLngBounds();
		map.fitBounds(bounds);
		setMap(map);
	}, []);
	const onUnmount = useCallback((map) => {
		setMap(null);
	}, []);
	return (
		<React.Fragment>
			<Box boxSizing="border-box" padding={4} display="flex" width="100%" height="45%">
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
					/>
				) : (
					<React.Fragment />
				)}
			</Box>
		</React.Fragment>
	);
};

export default SavedLocationBody;
