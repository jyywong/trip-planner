import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	selectedStop: 0,

	stops: [
		{
			id: 1,
			time: '9:30am',
			details: {
				title: 'Eat',
				body: 'Because you need strength'
			}
		},
		{
			id: 2,
			time: '10:00am',
			details: {
				title: 'Code',
				body: "Because it's awesome"
			}
		},
		{
			id: 3,
			time: '7:00pm',
			details: {
				title: 'Sleep',
				body: 'Because you need rest'
			}
		},
		{
			id: 4,
			time: '9:30am',
			details: {
				title: 'Repeat',
				body: 'Because this is the life you love'
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
