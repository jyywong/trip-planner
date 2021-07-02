import { configureStore } from '@reduxjs/toolkit';
import tripStopReducer from './Slices/TripStopSlice';
import timelineExpandReducer from './Slices/TimelineStateSlice';
import UIStateReducer from './Slices/UISlice';
export default configureStore({
	reducer: {
		timelineExpand: timelineExpandReducer,
		tripStop: tripStopReducer,
		UIState: UIStateReducer
	}
});
