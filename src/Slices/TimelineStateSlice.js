import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

export const timelineExpand = createSlice({
	name: 'timelineExpand',
	initialState,
	reducers: {
		collapseTimeline: (state) => {
			state = true;
			return state;
		}
	}
});

export const { collapseTimeline } = timelineExpand.actions;

export default timelineExpand.reducer;
