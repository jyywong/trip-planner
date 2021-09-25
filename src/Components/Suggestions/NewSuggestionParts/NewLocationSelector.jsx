import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { TextField, Grid, Typography } from '@material-ui/core';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Autocomplete } from '@material-ui/lab';
const libraries = [ 'places' ];

const NewLocationSelector = ({ setFormValues }) => {
	const [ inputValue, setInputValue ] = useState('');

	const isLoaded = useSelector((state) => state.tripStop.googleLibraryIsLoaded);
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
			const { place_id, description, structured_formatting } = suggestion;
			return { place_id, description, structured_formatting };
		});

	useEffect(
		() => {
			init();
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
					inputvalue={inputValue}
					getOptionSelected={(option, value) => option.id === value.id}
					getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
					onChange={async (event, newValue) => {
						console.log('onchange');
						setValue(newValue);
						const geoResponse = await getGeocode({ address: newValue.description });
						const { lat, lng } = await getLatLng(geoResponse[0]);
						setFormValues((current) => {
							console.log('newValue', newValue);
							const newForm = {
								...current,
								place_id: newValue.place_id,
								address: newValue.description,
								locationName: newValue.structured_formatting.main_text,
								lat,
								lng
							};
							return newForm;
						});
					}}
					renderInput={(params) => (
						<TextField {...params} label="Add a location" variant="outlined" fullWidth />
					)}
					onInputChange={(event, newInputValue) => {
						setInputValue(newInputValue);
						setValue(newInputValue);
					}}
					renderOption={(option) => (
						<Grid container alignItems="center">
							<Grid item>
								<LocationOnIcon />
							</Grid>
							<Grid item xs>
								{option.structured_formatting.main_text}
								<Typography variant="body2" color="textSecondary">
									{option.description}
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
