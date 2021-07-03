import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import LocationSearchBar from './LocationSearchBar';

import { Box } from '@material-ui/core';
const containerStyle = {
	width: '100%',
	height: '100%'
};

const center = {
	lat: -3.745,
	lng: -38.523
};

const libraries = [ 'places' ];
const NewStopLocationSelector = ({ collapseTimeline, formValues, setFormValues }) => {
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

	const onChooseLocation = (address, place_id, latLng) => {
		setFormValues((current) => ({ ...current, location: { address, place_id, latLng } }));
	};

	return (
		<React.Fragment>
			<Box display={collapseTimeline ? 'flex' : 'none'} boxSizing="border-box" padding={2}>
				{isLoaded && (
					<LocationSearchBar
						panTo={panTo}
						formValues={formValues}
						setCurrentMapMarker={setCurrentMapMarker}
						onChooseLocation={onChooseLocation}
					/>
				)}
			</Box>
			<Box display={collapseTimeline ? 'flex' : 'none'} boxSizing="border-box" width="100%" height="35%">
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

export default NewStopLocationSelector;
