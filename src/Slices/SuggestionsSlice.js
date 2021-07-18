import { createSlice } from '@reduxjs/toolkit';
import { setHours, setMinutes } from 'date-fns';
const today = new Date();

const initialState = {
	byID: {
		1: {
			id: 1,
			eventID: 1,
			creator: 1,
			created_at: 'today',
			content: {
				eventName: 'Event name',
				time: setMinutes(setHours(today, 13), 30).toISOString(),
				location: {
					name: "McDonald's",
					place_id: 'ChIJOYmf5_VAK4gR5jyD_UnsFJo',
					address: '5995 Mavis Rd, Mississauga, ON L5R 3T7, Canada',
					latLng: [ '43.6124365', '-79.6947028' ]
				},
				details:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, cupiditate exercitationem? Sunt dolore iure sed.'
			},
			votes: {
				upvotes: 5,
				downvotes: 5
			}
		},
		2: {
			id: 2,
			eventID: 1,
			creator: 1,
			created_at: 'today',
			content: {
				eventName: 'Eat somewhere else',
				time: setMinutes(setHours(today, 15), 30).toISOString(),
				location: {
					name: 'Subway',
					place_id: 'ChIJq7Ql3M80K4gRFiRJkXUWZ-I',
					address: '267 Queen St W Ground Fl, Toronto, ON M5V 1Z4, Canada',
					latLng: [ '43.65026350616548', '-79.38930504629994' ]
				},
				details:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, cupiditate exercitationem? Sunt dolore iure sed.'
			},
			votes: {
				upvotes: 1,
				downvotes: 4
			}
		}
	}
};

export const SuggestionsSlice = createSlice({
	name: 'suggestions',
	initialState,
	reducers: {
		newSuggestion: (state, action) => {
			return { ...state, byID: { ...state.byID, [action.payload.id]: { ...action.payload } } };
		},
		upvoteSuggestion: (state, action) => {
			state.byID[action.payload.id].votes.upvotes += 1;
		},
		downvoteSuggestion: (state, action) => {
			state.byID[action.payload.id].votes.downvotes += 1;
		}
	}
});

export const { newSuggestion, upvoteSuggestion, downvoteSuggestion } = SuggestionsSlice.actions;

export default SuggestionsSlice.reducer;
