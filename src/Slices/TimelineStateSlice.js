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
		},
		openEventIdeas: (state) => {
			state = 'TIMELINE_EVENT_IDEAS';
			return state;
		},
		returnToTimelineOnly: (state) => {
			state = 'TIMELINE_ONLY';
			return state;
		},
		openMembersList: (state) => {
			state = 'MEMBERS_TIMELINE';
			return state;
		}
	}
});

export const {
	openDetails,
	openSuggestions,
	openEventIdeas,
	returnToTimelineOnly,
	openMembersList
} = timelineState.actions;

export default timelineState.reducer;
