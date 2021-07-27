import { createSlice } from '@reduxjs/toolkit';

const initialState = { mode: 'TIMELINE_ONLY', selectedTrip: null };

export const timelineState = createSlice({
	name: 'timelineState',
	initialState,
	reducers: {
		openDetails: (state) => {
			state.mode = 'TIMELINE_DETAILS';
			return state;
		},
		openSuggestions: (state) => {
			state.mode = 'TIMELINE_DETAILS_SUGGESTIONS';
			return state;
		},
		openEventIdeas: (state) => {
			state.mode = 'TIMELINE_EVENT_IDEAS';
			return state;
		},
		returnToTimelineOnly: (state) => {
			state.mode = 'TIMELINE_ONLY';
			return state;
		},
		openMembersList: (state) => {
			state.mode = 'MEMBERS_TIMELINE';
			return state;
		},
		selectTrip: (state, action) => {
			state.selectedTrip = action.payload;
		}
	}
});

export const {
	openDetails,
	openSuggestions,
	openEventIdeas,
	returnToTimelineOnly,
	openMembersList,
	selectTrip
} = timelineState.actions;

export default timelineState.reducer;

export const timelineModeSelector = (state) => state.timelineState.mode;

export const timelineSelectedTrip = (state) => state.timelineState.selectedTrip;
