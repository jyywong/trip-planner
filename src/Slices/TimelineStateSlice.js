import { createSlice } from '@reduxjs/toolkit';

const initialState = 'TIMELINE_ONLY';

export const timelineState = createSlice({
	name: 'timelineState',
	initialState,
	reducers: {
		openDetails: (state) => {
			state = 'TIMELINE_DETAILS';
			return state;
		},
		openSuggestions: (state) => {
			state = 'TIMELINE_DETAILS_SUGGESTIONS';
			return state;
		}
	}
});

export const { openDetails, openSuggestions } = timelineState.actions;

export default timelineState.reducer;
