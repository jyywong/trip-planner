import React, { useEffect } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
	ComboboxOptionText
} from '@reach/combobox';
import '@reach/combobox/styles.css';
const LocationSearchBar = ({ panTo, formValues, setCurrentMapMarker, onChooseLocation }) => {
	const { init, ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
		requestOptions: {
			location: { lat: () => 43.653225, lng: () => -79.383186 },
			radius: 200 * 1000
		}
	});
	useEffect(() => {
		if (formValues.location.address !== '') {
			(async (address) => {
				setValue(address, false);
				clearSuggestions();

				try {
					const results = await getGeocode({ address });
					const { lat, lng } = await getLatLng(results[0]);
					panTo({ lat, lng });
					setCurrentMapMarker({ lat, lng });
					onChooseLocation(address);
				} catch (error) {
					console.log('error');
				}
			})(formValues.location.address);
		}
	}, []);
	return ready ? (
		<React.Fragment>
			<Combobox
				onSelect={async (address) => {
					setValue(address, false);
					clearSuggestions();
					try {
						const results = await getGeocode({ address });
						console.log(results[0]);
						const { lat, lng } = await getLatLng(results[0]);
						panTo({ lat, lng });
						setCurrentMapMarker({ lat, lng });
						onChooseLocation(address, results[0].place_id, { lat, lng });
					} catch (error) {
						console.log('error');
					}
				}}
			>
				<ComboboxInput
					value={value}
					onChange={(e) => {
						setValue(e.target.value);
					}}
					disabled={!ready}
					placeholder={'Enter an address'}
				/>
				<ComboboxPopover>
					{status === 'OK' &&
						data.map(({ place_id, description }) => <ComboboxOption key={place_id} value={description} />)}
				</ComboboxPopover>
			</Combobox>
		</React.Fragment>
	) : (
		<React.Fragment />
	);
};

export default LocationSearchBar;
