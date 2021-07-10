import React, { useState, useEffect } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { TextField, Grid, Typography } from '@material-ui/core';
import { useJsApiLoader } from '@react-google-maps/api';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import { makeStyles } from '@material-ui/styles';
import { Autocomplete } from '@material-ui/lab';
const libraries = [ 'places' ];

const NewLocationSelector = () => {
	const [ inputValue, setInputValue ] = useState('');

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries
	});
	const {
		init,
		ready,
		value,
		suggestions: { status, loading, data },
		setValue,
		clearSuggestions
	} = usePlacesAutocomplete({
		requestOptions: {
			location: { lat: () => 43.653225, lng: () => -79.383186 },
			radius: 200 * 1000
		}
	});
	const getOptions = () =>
		data.map((suggestion) => {
			const { place_id, description } = suggestion;
			return { place_id, description };
		});

	useEffect(
		() => {
			init();
			// console.log('being called');
			// console.log(data);
			// setOptions(data.map(({ place_id, description }) => ({ place_id, description })));
			// if (inputValue === '') {
			// 	setOptions([]);
			// }
		},
		[ isLoaded ]
	);

	return (
		<React.Fragment>
			{isLoaded && (
				<Autocomplete
					style={{ width: '100%' }}
					options={getOptions()}
					value={value}
					getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
					onChange={(event, newValue) => {
						setValue(newValue);
						console.log(event, newValue);
					}}
					renderInput={(params) => (
						<TextField {...params} label="Add a location" variant="outlined" fullWidth />
					)}
					onInputChange={(event, newInputValue) => {
						// console.log('inputvalue changing');
						setInputValue(newInputValue);
						setValue(newInputValue);
					}}
					renderOption={(option) => (
						<Grid container alignItems="center">
							<Grid item>
								<LocationOnIcon />
							</Grid>
							<Grid item xs>
								{option.description}
								<Typography variant="body2" color="textSecondary">
									Somewhere
								</Typography>
							</Grid>
						</Grid>
					)}
				/>
			)}
		</React.Fragment>
	);
};

export default NewLocationSelector;
