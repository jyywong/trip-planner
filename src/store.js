import { configureStore } from '@reduxjs/toolkit';
import tripStopReducer from './Slices/TripStopSlice';
import timelineStateReducer from './Slices/TimelineStateSlice';
import UIStateReducer from './Slices/UISlice';
export default configureStore({
	reducer: {
		timelineState: timelineStateReducer,
		tripStop: tripStopReducer,
		UIState: UIStateReducer
	}
});
