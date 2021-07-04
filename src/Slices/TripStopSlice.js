import { createSlice } from '@reduxjs/toolkit';
import { setHours, setMinutes } from 'date-fns';
const today = new Date();

const initialState = {
	selectedStop: 0,
	date: today.toISOString(),

	stops: [
		{
			id: 1,
			time: setMinutes(setHours(today, 9), 30).toISOString(),
			details: {
				title: 'Eat',
				body: 'Because you need strength'
			}
		},
		{
			id: 2,
			time: setMinutes(setHours(today, 10), 0).toISOString(),
			details: {
				title: 'Code',
				body: "Because it's awesome"
			}
		},
		{
			id: 3,
			time: setMinutes(setHours(today, 19), 0).toISOString(),
			details: {
				title: 'Sleep',
				body: 'Because you need rest'
			}
		},
		{
			id: 4,
			time: setMinutes(setHours(today, 9), 30).toISOString(),
			details: {
				title: 'Repeat',
				body: 'Because this is the life you love'
			},
			location: {
				address: '',
				place_id: '',
				latLng: {}
			}
		}
	]
};

export const TripStopSlice = createSlice({
	name: 'tripStops',
	initialState,
	reducers: {
		selectStop: (state, action) => {
			state.selectedStop = action.payload;
		},
		createStop: (state, action) => {
			state.stops.push(action.payload);
		}
	}
});

export const { selectStop, createStop } = TripStopSlice.actions;

export default TripStopSlice.reducer;
