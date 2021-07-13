import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	byID: {
		1: {
			id: 1,
			creator: 1,
			created_at: 'today',
			content: {
				eventName: 'Event name',
				time: '09:30',
				location: {
					name: "McDonald's",
					place_id: 'ChIJOYmf5_VAK4gR5jyD_UnsFJo',
					address: '5995 Mavis Rd, Mississauga, ON L5R 3T7, Canada'
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
			creator: 1,
			created_at: 'today',
			content: {
				eventName: 'Eat somewhere else',
				time: '10:30',
				location: {
					name: 'Subway',
					place_id: 'ChIJq7Ql3M80K4gRFiRJkXUWZ-I',
					address: '267 Queen St W Ground Fl, Toronto, ON M5V 1Z4, Canada'
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

export const EventIdeasSlice = createSlice({
	name: 'Event Ideas',
	initialState,
	reducers: {
		newEventIdea: (state, action) => {
			return { ...state, byID: { ...state.byID, [action.payload.id]: { ...action.payload } } };
		}
	}
});

export const { newEventIdea } = EventIdeasSlice.actions;

export default EventIdeasSlice.reducer;
