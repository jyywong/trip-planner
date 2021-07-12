import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	byID: {
		1: {
			id: 1,
			creator: 1,
			created_at: '',
			content: {
				eventName: '',
				time: '',
				location: {
					place_id: '',
					address: ''
				},
				details: ''
			},
			votes: {
				upvotes: 0,
				downvotes: 0
			}
		},
		2: {
			id: 2,
			creator: 1,
			created_at: '',
			content: {
				eventName: '',
				time: '',
				location: {
					name: '',
					place_id: '',
					address: ''
				},
				details: ''
			},
			votes: {
				upvotes: 0,
				downvotes: 0
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
		}
	}
});

export const { newSuggestion } = SuggestionsSlice.actions;

export default SuggestionsSlice.reducer;
