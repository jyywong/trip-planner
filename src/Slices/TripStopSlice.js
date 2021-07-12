import { createSlice } from '@reduxjs/toolkit';
import { setHours, setMinutes } from 'date-fns';
const today = new Date();

const initialState = {
	selectedStop: 0,
	googleLibraryIsLoaded: false,
	date: today.toISOString(),

	stops: [
		{
			id: 1,
			time: setMinutes(setHours(today, 9), 30).toISOString(),
			details: {
				title: 'Eat',
				body: 'Because you need strength'
			},
			location: {
				name: "McDonald's",
				address: '5995 Mavis Rd, Mississauga, ON L5R 3T7, Canada',
				place_id: 'ChIJOYmf5_VAK4gR5jyD_UnsFJo',
				latLng: [ '43.6124365', '-79.6947028' ]
			}
		},
		{
			id: 2,
			time: setMinutes(setHours(today, 10), 0).toISOString(),
			details: {
				title: 'Code',
				body: "Because it's awesome"
			},
			location: {
				name: 'Streetsville Library',
				address: '112 Queen St S, Mississauga, ON L5M 1K8, Canada',
				place_id: 'ChIJ0dswc7hBK4gRedQAX5fxhOM',
				latLng: [ '43.58395566925499', '-79.71705160190031' ]
			}
		},
		{
			id: 3,
			time: setMinutes(setHours(today, 19), 0).toISOString(),
			details: {
				title: 'Sleep',
				body: 'Because you need rest'
			},
			location: {
				name: 'Hotel ALT',
				address: 'Hotel ALT Toronto Pearson, 6080 Viscount Rd, Mississauga, ON L4V 0A1, Canada',
				place_id: 'ChIJgfwDnno5K4gR-4yrgtGm3UA',
				latLng: [ '43.68992430069423', '-79.61469001539221' ]
			}
		}
	]
};

export const TripStopSlice = createSlice({
	name: 'tripStops',
	initialState,
	reducers: {
		updateGoogleIsLoaded: (state, action) => {
			state.googleLibraryIsLoaded = action.payload;
		},
		selectStop: (state, action) => {
			state.selectedStop = action.payload;
		},
		createStop: (state, action) => {
			state.stops.push(action.payload);
		}
	}
});

export const { updateGoogleIsLoaded, selectStop, createStop } = TripStopSlice.actions;

export default TripStopSlice.reducer;
